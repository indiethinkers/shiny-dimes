"use client";

import { useState, useEffect } from 'react';
import type { Story } from '@/types';
import TypewriterQuote from './TypewriterQuote';

export default function Card({ 
  initialStory
}: { 
  initialStory: Story;
}) {
  const [mounted, setMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative">
      <div className="px-4" key={initialStory.id}>
        <div className="w-[640px] min-h-[150px] font-mono flex flex-col items-center">
          <TypewriterQuote quote={initialStory.quote} />
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
        </div>
      </div>
      <div className="fixed bottom-4 left-4 text-sm text-gray-500">
        <a href="/" className="hover:text-gray-700 transition-colors">shiny dimes</a>
      </div>
    </div>
  );
}
