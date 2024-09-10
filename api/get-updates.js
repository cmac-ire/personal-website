async function fetchUpdates() {
  try {
      const response = await fetch('/api/repo');
      const data = await response.json();

      return {
          repo: data.repo,
          contents: data.contents,
          commits: data.commits
      };
  } catch (error) {
      console.error('Error fetching updates:', error);
      return null;
  }
}

// Call this function to get updates
fetchUpdates().then(updates => {
  if (updates) {
      console.log('Updates:', updates);
  }
});
