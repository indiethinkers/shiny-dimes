'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Story } from '@/types';
import { sample, without } from 'lodash';

interface KeyboardHandlerProps {
  allStories: Story[];
}

// Keep track of recently shown stories to avoid immediate repeats
let recentStories: string[] = [];
const MAX_RECENT = 3;

function getRandomStory(stories: Story[]) {
  // Filter out recently shown stories
  const availableStories = without(
    stories, 
    ...stories.filter(story => recentStories.includes(story.slug))
  );
  
  // If we've filtered out all stories, reset and use all stories
  if (availableStories.length === 0) {
    recentStories = [];
    return sample(stories)!;
  }

  // Get a random story from available ones
  const selectedStory = sample(availableStories)!;
  
  // Update recent stories for immediate repeat prevention
  recentStories.push(selectedStory.slug);
  if (recentStories.length > MAX_RECENT) {
    recentStories.shift();
  }
  
  return selectedStory;
}

export default function KeyboardHandler({ allStories }: KeyboardHandlerProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        const nextStory = getRandomStory(allStories);
        router.push(`/dime/${nextStory.slug}`);
      }
    };

    let lastTap = 0;
    const handleDoubleTap = (event: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 300 && tapLength > 0) {
        event.preventDefault();
        const nextStory = getRandomStory(allStories);
        router.push(`/dime/${nextStory.slug}`);
      }
      lastTap = currentTime;
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchend', handleDoubleTap);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchend', handleDoubleTap);
    };
  }, [router, allStories]);

  return null;
}
