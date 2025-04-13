'use server';

import type { Story } from '@/types';
import axios from 'axios';

export async function fetchStoriesData(): Promise<Story[]> {
  // Fallback data in case of fetch failure
  const staticStories: Story[] = [
    {
      id: 1,
      title: 'The Power of Persistence',
      author: 'Unknown',
      quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
      summary: 'A reminder that persistence is key to achieving our goals.',
      url: '',
      slug: 'power-of-persistence'
    },
    {
      id: 2,
      title: 'Daily Progress',
      author: 'James Clear',
      quote: 'Small improvements accumulate into remarkable results.',
      summary: 'How tiny changes lead to significant outcomes.',
      url: '',
      slug: 'daily-progress'
    },
    {
      id: 3,
      title: 'Embrace the Journey',
      author: 'Unknown',
      quote: 'Life is about the journey, not the destination.',
      summary: 'Finding joy in the process of growth and learning.',
      url: '',
      slug: 'embrace-journey'
    }
  ];

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
      return staticStories;
    }

    const rows = data.split('\n').slice(1).filter(Boolean); // Skip header row
    console.log('Number of rows found:', rows.length);
    
    const stories = rows.map((row: string, index: number) => {
      try {
        // Parse CSV line respecting quotes
        const values = row.match(/(?:"([^"]*)"|([^,]+))(?:,|$)/g)?.map(value => {
          // Clean the value by removing quotes, commas, and extra whitespace
          return value.replace(/["\s,]+$/, '').replace(/^"|"$/g, '').trim();
        }) || [];
        
        const [id, title, quote, author, url = '', summary = '', slug = ''] = values;
        return {
          id: parseInt(id, 10) || index + 1,
          title,
          author,
          url,
          summary,
          quote,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        };
      } catch (rowError) {
        console.error('Error parsing row:', rowError);
        return null;
      }
    }).filter((story: Story | null): story is Story => story !== null);

    if (stories.length === 0) {
      console.warn('No valid stories found in the sheet');
      return staticStories;
    }

    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return staticStories;
  }
}
