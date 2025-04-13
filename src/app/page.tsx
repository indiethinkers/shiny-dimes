import Card from '@/components/Card';
import type { Story } from '@/types';
import { sample, without } from 'lodash';
import axios from 'axios';

export const dynamic = 'force-dynamic';

// Keep track of recently shown stories to avoid immediate repeats
let recentStories: string[] = [];
const MAX_RECENT = 3;
const STORAGE_KEY = 'seen-stories';

function getRandomStory(stories: Story[]) {
  // Initialize seen stories from localStorage
  let seenStories: string[] = [];
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    seenStories = stored ? JSON.parse(stored) : [];
    
    // Clear storage if we've seen more than 130 stories
    if (seenStories.length > 130) {
      localStorage.removeItem(STORAGE_KEY);
      seenStories = [];
    }
  }

  // Filter out both recently shown and previously seen stories
  const availableStories = without(
    stories, 
    ...stories.filter(story => 
      recentStories.includes(story.slug) || 
      seenStories.includes(story.slug)
    )
  );
  
  // If we've filtered out all stories, reset everything
  if (availableStories.length === 0) {
    recentStories = [];
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    seenStories = [];
    return sample(stories)!;
  }

  // Get a random story from available ones
  const selectedStory = sample(availableStories)!;
  
  // Update recent stories for immediate repeat prevention
  recentStories.push(selectedStory.slug);
  if (recentStories.length > MAX_RECENT) {
    recentStories.shift();
  }
  
  // Update seen stories in localStorage
  if (typeof window !== 'undefined') {
    seenStories.push(selectedStory.slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seenStories));
  }
  
  return selectedStory;
}

async function fetchStoriesData(): Promise<Story[]> {
  // Fallback data in case of fetch failure
  const fallbackStory: Story = {
    id: 1,
    title: 'Fallback Story',
    author: 'System',
    url: '',
    summary: 'Unable to fetch stories. Using fallback content.',
    quote: 'The best preparation for tomorrow is doing your best today.',
    slug: 'fallback-story'
  };

  const SHEET_ID = '1rOpf4FaW9VszMfkB8XfI8QuR6WMeGz-ABRBfkRW1x6o';
  const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

  try {
    const response = await axios.get(SHEET_URL);
    const data = response.data;
    if (!data) {
      console.warn('No data received from Google Sheets');
      return [fallbackStory];
    }

    const stories: Story[] = data.split('\n')
      .slice(1) // Skip header row
      .filter(Boolean)
      .map((row: string, index: number) => {
        try {
          const [id, title, quote, author, url = '', summary = '', slug = ''] = row.split(',').map(cell => cell.trim().replace(/^["']+|["']+$/g, ''));
          return {
            id: parseInt(id, 10) || index + 1,
            title,
            author,
            url,
            summary,
            quote,
            slug
          };
        } catch (rowError) {
          console.error('Error parsing row:', rowError);
          return null;
        }
      })
      .filter((story: Story | null): story is Story => story !== null);

    if (stories.length === 0) {
      console.warn('No valid stories found in the sheet');
      return [fallbackStory];
    }

    return stories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return [fallbackStory];
  }
}

export default async function Home() {
  const storiesData = await fetchStoriesData();
  const initialStory = getRandomStory(storiesData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">

      <Card initialStory={initialStory} />

      <a
        href="https://codenprose.com"
        target="_blank"
        rel="noopener"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by codenprose
      </a>
    </div>
  );
}
