import InteractiveCard from '@/components/InteractiveCard';
import storiesData from '@/data/stories.json';
import type { Story } from '@/types';

export const dynamic = 'force-dynamic';

function getRandomStory(stories: Story[]) {
  return stories[Math.floor(Math.random() * stories.length)];
}

export default function Home() {
  const initialStory = getRandomStory(storiesData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <a
        href="/"
        className="fixed top-4 left-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        shiny dimes
      </a>
      <div className="fixed top-4 right-4 flex items-center gap-2">
        <img
          src="/google.svg"
          alt="Google"
          className="h-4 w-auto hidden"
        />
        <a
          href="https://chrome.google.com/webstore"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
        >
          download chrome extension
        </a>
      </div>
      <InteractiveCard 
        initialStory={initialStory} 
        stories={storiesData}
      />

      <a
        href="https://hunter.vc"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 text-sm text-gray-500 hover:text-gray-800 transition-colors font-medium"
      >
        by hunter labs
      </a>
    </div>
  );
}
