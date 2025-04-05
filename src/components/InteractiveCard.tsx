"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypeWriter from './TypeWriter';
import type { Story } from '@/types';

export default function InteractiveCard({ 
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
      <TypeWriter
        key={currentStory.id}
        title={currentStory.title}
        blurb={currentStory.quote}
        author={currentStory.author}
        link={currentStory.url}
      />
      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <span>hit the spacebar for another dime</span>
      </div>
    </div>
  );
}
