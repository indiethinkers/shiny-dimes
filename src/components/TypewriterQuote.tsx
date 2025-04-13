"use client";

import { useState, useEffect, useRef } from 'react';

export default function TypewriterQuote({ quote }: { quote: string }) {
  const [displayedQuote, setDisplayedQuote] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // Separate refs for typewriter timeouts and blinking intervals
  const typeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Blinking cursor effect - starts when not typing
  useEffect(() => {
    // Clear any existing blinking interval when typing starts
    if (blinkIntervalRef.current) {
      clearInterval(blinkIntervalRef.current);
      blinkIntervalRef.current = null;
    }

    // Start blinking when not typing
    if (!isTyping) {
      blinkIntervalRef.current = setInterval(() => {
        setCursorVisible((prev) => !prev);
      }, 530);
    }

    // Cleanup on unmount or when isTyping changes
    return () => {
      if (blinkIntervalRef.current) {
        clearInterval(blinkIntervalRef.current);
        blinkIntervalRef.current = null;
      }
    };
  }, [isTyping]);

  // Typewriter effect
  useEffect(() => {
    // Setup a cancellation flag to prevent state updates on stale effects
    let cancelled = false;

    // Reset state for the new quote
    setOpacity(0);
    setDisplayedQuote('');
    setIsTyping(true);
    setCursorVisible(true);

    // Clear any existing typewriter timeout
    if (typeTimeoutRef.current) {
      clearTimeout(typeTimeoutRef.current);
    }

    // Start fade-in after a short delay
    typeTimeoutRef.current = setTimeout(() => {
      if (cancelled) return;
      setOpacity(1);

      let currentIndex = 0;
      
      const typeChar = () => {
        if (cancelled) return; // stop if this effect is canceled

        if (currentIndex < quote.length) {
          setDisplayedQuote(quote.slice(0, currentIndex + 1));
          currentIndex++;
          typeTimeoutRef.current = setTimeout(typeChar, 70);
        } else {
          setIsTyping(false);
        }
      };

      typeChar();
    }, 50);

    // Cleanup: cancel any timeouts and mark this effect as cancelled
    return () => {
      cancelled = true;
      if (typeTimeoutRef.current) {
        clearTimeout(typeTimeoutRef.current);
      }
    };
  }, [quote]);

  return (
    <div
      className="whitespace-pre-wrap leading-relaxed text-center font-mono"
      style={{
        opacity,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      {displayedQuote}
      <span
        className="inline-block ml-[1px] -mb-[1px] relative -top-[2px]"
        style={{
          backgroundColor: cursorVisible ? 'currentColor' : 'transparent',
          width: '0.4em',
          height: '1.2em',
          display: 'inline-block',
          verticalAlign: 'middle',
          opacity: cursorVisible ? 0.7 : 0,
          transition: 'opacity 0.1s ease-in-out',
        }}
      >
        &nbsp;
      </span>
    </div>
  );
}
