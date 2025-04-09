"use client";

import { useState, useEffect, useLayoutEffect } from 'react';

export default function TypewriterQuote({ quote }: { quote: string }) {
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [opacity, setOpacity] = useState(0);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // Slower blink rate for mechanical feel

    return () => clearInterval(cursorInterval);
  }, []);

  // Reset states when quote changes
  useLayoutEffect(() => {
    setOpacity(0);
    setDisplayedQuote('');
    
    // Small delay to ensure opacity transition works
    const fadeTimeout = setTimeout(() => {
      setOpacity(1);
    }, 50);

    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= quote.length) {
        setDisplayedQuote(quote.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 70); // Typing speed

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [quote]);

  return (
    <div 
      className="whitespace-pre-wrap leading-relaxed text-center font-mono"
      style={{
        opacity,
        transition: 'opacity 1s ease-in-out'
      }}>
      {displayedQuote}
      <span 
        className="inline-block ml-[1px] -mb-[1px] relative -top-[2px]"
        style={{ 
          backgroundColor: showCursor ? 'currentColor' : 'transparent',
          width: '0.4em',
          height: '1.2em',
          display: 'inline-block',
          verticalAlign: 'middle',
          opacity: showCursor ? 0.7 : 0,
          transition: 'opacity 0.1s ease-in-out'
        }}
      >
        &nbsp;
      </span>
    </div>
  );
}
