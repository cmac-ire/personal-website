document.addEventListener('DOMContentLoaded', async () => {
    const repoContainer = document.getElementById('repositories');

    async function fetchAndDisplayRepos() {
        repoContainer.innerHTML = ''; // Clear the container before loading new content

        try {
            const response = await fetch('https://api.github.com/users/cmac-ire/repos');
            const repositories = await response.json();

            if (repositories.length > 0) {
                repositories.forEach(repo => {
                    const repoElement = document.createElement('div');
                    repoElement.classList.add('repo');

                    repoElement.innerHTML = `
                        <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                        <p>${repo.description || 'No description provided.'}</p>
                        <p><strong>Last updated:</strong> ${new Date(repo.updated_at).toLocaleDateString()}</p>
                        <a href="${repo.html_url}" target="_blank">View Repository</a>
                    `;

                    repoContainer.appendChild(repoElement);
                });
            } else {
                repoContainer.innerHTML = '<p>No repositories found.</p>';
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
            repoContainer.innerHTML = '<p>Error loading repositories.</p>';
        }
    }

    // Fetch the repositories once when the page loads
    await fetchAndDisplayRepos();

    // Poll for updates every 5 seconds (5000 ms)
    setInterval(async () => {
        await fetchAndDisplayRepos();
    }, 5000); // 5000 ms = 5 seconds
});
