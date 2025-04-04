import InteractiveCard from '@/components/InteractiveCard';
import storiesData from '@/data/stories.json';
import type { Story } from '@/types';

function getRandomStory(stories: Story[]) {
  return stories[Math.floor(Math.random() * stories.length)];
}

export default function Home() {
  const initialStory = getRandomStory(storiesData);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
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
