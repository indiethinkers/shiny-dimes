"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { Story } from '@/types';

export default function Card({ 
  initialStory, 
  stories 
}: { 
  initialStory: Story;
  stories: Story[];
}) {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState(initialStory);

  const getRandomStory = () => stories[Math.floor(Math.random() * stories.length)];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        const story = getRandomStory();
        setCurrentStory(story);
        router.push(`/dime/${story.slug}`, { scroll: false });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative">
      <div className="px-4" key={currentStory.id}>
        <div className="w-[640px] min-h-[150px] font-mono flex flex-col items-center">
          <div className="whitespace-pre-wrap leading-relaxed text-center">
            {currentStory.quote}
          </div>
          <div className="mt-6">
            <a
              href={currentStory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-800 transition-colors text-sm"
            >
              (view essay)
            </a>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <span>hit the spacebar for another dime</span>
      </div>
    </div>
  );
}
