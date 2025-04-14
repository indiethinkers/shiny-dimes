'use client';

import Card from '@/components/Card';
import KeyboardHandler from '@/components/KeyboardHandler';
import { useStories } from '@/components/StoriesProvider';
import type { Story } from '@/types';

type ClientPageProps = {
  slug: string;
};

export default function ClientPage({ slug }: ClientPageProps) {
  const stories = useStories();
  const story = stories.find((s: Story) => s.slug === slug);
  
  if (!story) {
    return <div className="p-4">Story not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      <div className="fixed top-4 right-4 flex gap-2">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScOZVI77oj81iubi5AgluN-vC6d4d9fdweAYmkVJlfcGW33DQ/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          submit
        </a>
        <span className="text-sm text-gray-500">{'//'}</span>
        <a
          href="https://indiethinkers.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          subscribe
        </a>
      </div>
      <KeyboardHandler 
        allStories={stories}
      />
      <Card 
        initialStory={story} 
        allStories={stories}
        isFadingOut={false}
      />

      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <span className="hidden md:inline">hit the spacebar for another dime</span>
        <span className="md:hidden">double tap for another dime</span>
      </div>
    </div>
  );
}
