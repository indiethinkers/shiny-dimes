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

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [router, allStories]);

  return null;
}
