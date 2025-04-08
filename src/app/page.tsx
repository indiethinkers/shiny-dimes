import Card from '@/components/Card';
import storiesData from '@/data/stories.json';
import type { Story } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { sample, sampleSize, without } from 'lodash';

export const dynamic = 'force-dynamic';

// Keep track of recently shown stories to avoid repetition
let recentStories: string[] = [];
const MAX_RECENT = 3; // Avoid repeating the last 3 stories

function getRandomStory(stories: Story[]) {
  // Filter out recently shown stories
  const availableStories = without(stories, ...stories.filter(story => recentStories.includes(story.slug)));
  
  // If we've filtered out all stories, reset the history
  if (availableStories.length === 0) {
    recentStories = [];
    return sample(stories)!;
  }

  // Get a random story from available ones
  const selectedStory = sample(availableStories)!;
  
  // Update recent stories
  recentStories.push(selectedStory.slug);
  if (recentStories.length > MAX_RECENT) {
    recentStories.shift();
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
        href="https://indiethinkers.com"
        target="_blank"
        rel="noopener"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by indie thinkers
      </a>
    </div>
  );
}
