"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import type { Story } from '@/types';
import TypewriterQuote from './TypewriterQuote';

export default function Card({ 
  initialStory, 
  stories 
}: { 
  initialStory: Story;
  stories: Story[];
}) {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState(initialStory);
  const [mounted, setMounted] = useState(false);
  
  // Keep track of seen stories in memory
  const STORAGE_KEY = 'seen-stories';
  
  const updateSeenStories = (story: Story) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let seenStories = stored ? JSON.parse(stored) : [];
    
    // If we've seen all stories, don't add to seen list
    if (seenStories.length >= stories.length) {
      return;
    }
    
    // Add new story if not already seen
    if (!seenStories.includes(story.slug)) {
      seenStories.push(story.slug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seenStories));
      }
  };

  const getRandomStory = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const seenStories = stored ? JSON.parse(stored) : [];
    
    // Filter out seen stories
    const unseenStories = stories.filter(story => !seenStories.includes(story.slug));
    
    // If we've seen all stories, clear storage and start over
    if (unseenStories.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
        return stories[Math.floor(Math.random() * stories.length)];
    }
    
    // Return a random unseen story
    return unseenStories[Math.floor(Math.random() * unseenStories.length)];
  };

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
    updateSeenStories(initialStory);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        const story = getRandomStory();
        setCurrentStory(story);
        router.push(`/dime/${story.slug}`, { scroll: false });
        updateSeenStories(story);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative">
      <div className="px-4" key={currentStory.id}>
        <div className="w-[640px] min-h-[150px] font-mono flex flex-col items-center">
          <TypewriterQuote quote={currentStory.quote} />
          <div className="mt-6">
            <a
              href={currentStory.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              style={{
                opacity: 0,
                animation: 'fadeIn 2s ease-in-out forwards',
                animationDelay: '0.5s'
              }}>
              <style jsx>{`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
              `}</style>
              (view essay)
            </a>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <span>
          hit the spacebar for another dime
        </span>
      </div>
    </div>
  );
}
