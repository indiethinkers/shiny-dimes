let currentStory;
const STORAGE_KEY = 'seen-stories';
const MAX_RECENT = 3;
let recentStories = [];

function getRandomStory() {
  // Initialize seen stories from localStorage
  let seenStories = [];
  const stored = localStorage.getItem(STORAGE_KEY);
  seenStories = stored ? JSON.parse(stored) : [];
  
  // Clear storage if we've seen more than 130 stories
  if (seenStories.length > 130) {
    localStorage.removeItem(STORAGE_KEY);
    seenStories = [];
  }

  // Filter out both recently shown and previously seen stories
  const availableStories = stories.filter(story => 
    !recentStories.includes(story.slug) && 
    !seenStories.includes(story.slug)
  );
  
  // If we've filtered out all stories, reset everything
  if (availableStories.length === 0) {
    recentStories = [];
    localStorage.removeItem(STORAGE_KEY);
    seenStories = [];
    return stories[Math.floor(Math.random() * stories.length)];
  }

  // Get a random story from available ones
  const selectedStory = availableStories[Math.floor(Math.random() * availableStories.length)];
  
  // Update recent stories for immediate repeat prevention
  recentStories.push(selectedStory.slug);
  if (recentStories.length > MAX_RECENT) {
    recentStories.shift();
  }
  
  // Update seen stories in localStorage
  seenStories.push(selectedStory.slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seenStories));
  
  return selectedStory;
}

function updateStory(story) {
  currentStory = story;
  document.getElementById('quote').textContent = story.quote;
  document.getElementById('essay-link').href = story.url;
}

function handleKeyPress(event) {
  if (event.code === 'Space') {
    event.preventDefault();
    updateStory(getRandomStory());
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateStory(getRandomStory());
  window.addEventListener('keydown', handleKeyPress);
});
