'use client';

import { createContext, useContext } from 'react';
import type { Story } from '@/types';

export const StoriesContext = createContext<Story[]>([]);

export function useStories() {
  return useContext(StoriesContext);
}

export default function StoriesProvider({
  stories,
  children,
}: {
  stories: Story[];
  children: React.ReactNode;
}) {
  return (
    <StoriesContext.Provider value={stories}>
      {children}
    </StoriesContext.Provider>
  );
}
