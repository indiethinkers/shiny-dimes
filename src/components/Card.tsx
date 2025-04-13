"use client";

import type { Story } from '@/types';
import Link from 'next/link';
import TypewriterQuote from './TypewriterQuote';
import { useEffect, useState, useRef } from 'react';

export default function Card({ 
  initialStory,
  allStories
}: { 
  initialStory: Story;
  allStories: Story[];
}) {
  const [currentStory, setCurrentStory] = useState(initialStory);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);

  useEffect(() => {
    isMobileRef.current = window.matchMedia('(max-width: 768px)').matches;
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        console.log('Space pressed');
        event.preventDefault();
        const currentIndex = allStories.findIndex(story => story.id === currentStory.id);
        console.log('Current index:', currentIndex);
        const nextIndex = (currentIndex + 1) % allStories.length;
        console.log('Next index:', nextIndex);
        console.log('Next story:', allStories[nextIndex]);
        setCurrentStory(allStories[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [allStories, currentStory]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobileRef.current) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      
      // If swipe distance is more than 50px, trigger the story change
      if (diff > 50) {
        const nextIndex = (allStories.findIndex(story => story.id === currentStory.id) + 1) % allStories.length;
        setCurrentStory(allStories[nextIndex]);
      }
    }
  };

  return (
    <div 
      className="relative" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed top-4 left-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">shiny dimes</Link>
      </div>

      <div className="w-full max-w-2xl mx-auto px-4" key={currentStory.id}>
        <div className="min-h-[150px] font-mono flex flex-col items-center">
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

      <div className="fixed bottom-4 right-4 text-sm text-gray-500">
        by codenprose
      </div>
    </div>
  );
}
