"use client";

import { useState, useEffect } from 'react';
import Card from './Card';
import type { Story } from '@/types';

export default function InteractiveCard({ 
  initialStory, 
  stories 
}: { 
  initialStory: Story;
  stories: Story[];
}) {
  const [currentStory, setCurrentStory] = useState(initialStory);

  const getRandomStory = () => stories[Math.floor(Math.random() * stories.length)];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setCurrentStory(getRandomStory());
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <Card
      key={currentStory.id}
      title={currentStory.title}
      blurb={currentStory.quote}
      author={currentStory.author}
      link={currentStory.url}
    />
  );
}
