const STORAGE_KEY = 'seen-stories';

export function getSeenCount(): number {
  if (typeof window === 'undefined') return 0;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return 0;
  
  try {
    const seenStories = JSON.parse(stored);
    return Array.isArray(seenStories) ? seenStories.length : 0;
  } catch {
    return 0;
  }
}
