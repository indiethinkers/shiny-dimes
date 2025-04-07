let currentStory;

function getRandomStory() {
  return stories[Math.floor(Math.random() * stories.length)];
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
