"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Story } from '@/types';
import TypewriterQuote from './TypewriterQuote';

export default function Card({ 
  initialStory,
  isFadingOut
}: { 
  initialStory: Story;
  isFadingOut: boolean;
}) {
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isMobileRef = useRef<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Handle initialization after mount
  useEffect(() => {
    setMounted(true);
    isMobileRef.current = window.matchMedia('(max-width: 768px)').matches;
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobileRef.current) return;
    
    touchEndX.current = e.changedTouches[0].clientX;
    
    if (touchStartX.current && touchEndX.current) {
      const diff = touchStartX.current - touchEndX.current;
      
      // If swipe distance is more than 50px, trigger the story change
      if (diff > 50 && initialStory) {
        // We'll handle this in the parent component
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div 
      className="relative" 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="fixed top-4 left-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700 transition-colors">shiny dimes</Link>
      </div>

      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Apply transition and conditional opacity */}
        <div 
          className={`min-h-[150px] font-mono flex flex-col items-center transition-opacity duration-300 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {initialStory && (
            <>
              <TypewriterQuote key={initialStory.id} quote={initialStory.quote || ''} />
              <div className="mt-6">
                <a
                  href={initialStory.url}
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
            </>
          )}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-sm text-gray-500">
        <span>by </span>
        <a href="https://indiethinkers.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-gray-800 transition-colors font-medium">
          indiethinkers
        </a>
      </div>
    </div>
  );
}
