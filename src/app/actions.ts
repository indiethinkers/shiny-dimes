'use server';

import type { Story } from '@/types';
import axios from 'axios';

// Cache stories data for 1 minute to avoid rate limits
let cachedStories: Story[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

export async function fetchStoriesData(): Promise<Story[]> {
  // Return cached data if available and not expired
  const now = Date.now();
  if (cachedStories && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedStories;
  }

  try {
    // Convert edit URL to a public CSV URL
    const SHEET_ID = '1rOpf4FaW9VszMfkB8XfI8QuR6WMeGz-ABRBfkRW1x6o';
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    
    console.log('Fetching from:', SHEET_URL);
    const response = await axios.get(SHEET_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'text/csv,text/plain,*/*'
      },
      responseType: 'text'
    });
    const data = response.data;
    
    if (!data) {
      console.warn('No data received from Google Sheets');
      return [];
    }

    const rows = data.split('\n').slice(1).filter(Boolean); // Skip header row
    console.log('Number of rows found:', rows.length);
    
    const stories = rows.map((row: string, index: number) => {
      try {
        // Parse CSV line respecting quotes
        const values = row.match(/(?:"([^"]*(?:""[^"]*)*)"|([^,]+))(?:,|$)/g)?.map(value => {
          // Remove enclosing quotes, handle double quotes, and remove trailing comma
          return value
            .replace(/,\s*$/, '') // Remove trailing comma
            .replace(/^"(.*)"$/, '$1') // Remove enclosing quotes
            .replace(/""/g, '"') // Convert double quotes to single quotes
            .trim();
        }) || [];
        
        const [id, title, quote, author, url = '', summary = '', slug = ''] = values;
        return {
          id: parseInt(id, 10) || index + 1,
          title,
          author,
          url,
          summary,
          quote,
          slug: slug || (() => {
            // Create a hash of the title for the slug
            const hash = Math.abs(title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)).toString(36);
            return `story-${hash}`;
          })()
        };
      } catch (rowError) {
        console.error('Error parsing row:', rowError);
        return null;
      }
    }).filter((story: Story | null): story is Story => story !== null);

    if (stories.length === 0) {
      console.warn('No valid stories found in the sheet');
      return [];
    }

    // Update cache
    cachedStories = stories;
    lastFetchTime = now;
    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [];
  }
}

export async function fetchStoryBySlug(slug: string): Promise<Story | null> {
  try {
    const stories = await fetchStoriesData(); // Ensures data is fetched/cached
    const story = stories.find(s => s.slug === slug);
    return story || null;
  } catch (error) {
    console.error(`Error fetching story by slug ${slug}:`, error);
    return null;
  }
}
