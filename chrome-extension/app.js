let currentStory;
const MAX_RECENT = 3;
let recentStories = [];

function getRandomStory() {
  // Filter out recently shown stories
  const availableStories = stories.filter(story => 
    !recentStories.includes(story.slug)
  );
  
  // If we've filtered out all stories, reset everything
  if (availableStories.length === 0) {
    recentStories = [];
    return stories[Math.floor(Math.random() * stories.length)];
  }

  // Get a random story from available ones
  const selectedStory = availableStories[Math.floor(Math.random() * availableStories.length)];
  
  // Update recent stories for immediate repeat prevention
  recentStories.push(selectedStory.slug);
  if (recentStories.length > MAX_RECENT) {
    recentStories.shift();
  }
  
  return selectedStory;
}

function updateStory(story) {
  currentStory = story;
  document.getElementById('quote').textContent = story.quote;
  document.getElementById('essay-link').href = story.url;
}



// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateStory(getRandomStory());
});
