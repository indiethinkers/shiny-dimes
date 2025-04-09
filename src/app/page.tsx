import Card from '@/components/Card';
import storiesData from '@/data/stories.json';
import type { Story } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { sample, sampleSize, without } from 'lodash';

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

export default function Home() {
  const initialStory = getRandomStory(storiesData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <Link
        href="/"
        className="fixed top-4 left-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        shiny dimes
      </Link>
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <Image
          src="/google.svg"
          alt="Google"
          width={16}
          height={16}
          className="h-4 w-auto hidden"
        />
        <a
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noopener"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
        >
          download chrome extension
        </a>
      </div>
      <Card 
        initialStory={initialStory} 
        stories={storiesData}
      />

      <a
        href="https://hunter.vc"
        target="_blank"
        rel="noopener"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by hunter labs
      </a>
    </div>
  );
}
