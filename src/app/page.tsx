import Card from '@/components/Card';
import storiesData from '@/data/stories.json';
import type { Story } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

function getRandomStory(stories: Story[]) {
  return stories[Math.floor(Math.random() * stories.length)];
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
