'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { useStories } from '@/components/StoriesProvider';
import type { Story } from '@/types';
import { sample, without } from 'lodash';

export const dynamic = 'force-dynamic';

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

export default function Home() {
  const stories = useStories();
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Initialize with a random story
  useEffect(() => {
    if (!currentStory && stories.length > 0) {
      const initialStory = sample(stories)!;
      setCurrentStory(initialStory);
      recentStories.push(initialStory.slug);
      if (recentStories.length > MAX_RECENT) {
        recentStories.shift();
      }
    }
  }, [stories, currentStory]);

  const triggerTransition = () => {
    if (isFadingOut || !currentStory) return; // Prevent multiple triggers

    const nextStory = getRandomStory(stories);
    setIsFadingOut(true);

    // Wait for fade-out animation before updating the story
    setTimeout(() => {
      setCurrentStory(nextStory);
      setIsFadingOut(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        triggerTransition();
      }
    };

    let lastTap = 0;
    const handleDoubleTap = (event: TouchEvent) => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      
      if (tapLength < 300 && tapLength > 0) { // Double tap detected
        event.preventDefault();
        triggerTransition();
      }
      lastTap = currentTime;
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchend', handleDoubleTap);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchend', handleDoubleTap);
    };
  }, [isFadingOut, currentStory]); // Only depend on state that affects the event handlers

  if (!currentStory) {
    return null; // Or a loading state
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
      <Card 
        initialStory={currentStory} 
        isFadingOut={isFadingOut}
      />

      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <span className="hidden md:inline">hit the spacebar for another dime</span>
        <span className="md:hidden">double tap for another dime</span>
      </div>
    </div>
  );
}
