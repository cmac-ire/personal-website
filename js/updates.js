document.addEventListener('DOMContentLoaded', async () => {
    const repoContainer = document.getElementById('repositories');

    async function fetchAndDisplayRepos() {
        repoContainer.innerHTML = ''; // Clear the container before loading new content

        try {
            const repoResponse = await fetch('https://api.github.com/users/cmac-ire/repos');
            const repositories = await repoResponse.json();

            for (const repo of repositories) {
                const repoElement = document.createElement('div');
                repoElement.classList.add('repo-block');

                const commitsResponse = await fetch(`https://api.github.com/repos/cmac-ire/${repo.name}/commits?per_page=3`);
                const commits = await commitsResponse.json();

                const commitsHtml = commits.map(commit => `
                    <div class="commit">
                        <p><strong>Message:</strong> ${commit.commit.message}</p>
                        <p><strong>Date:</strong> ${new Date(commit.commit.author.date).toLocaleDateString()}</p>
                        <p><strong>Author:</strong> ${commit.commit.author.name}</p>
                    </div>
                `).join('');

                repoElement.innerHTML = `
                    <h2 class="repo-title"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
                    <p class="repo-description">${repo.description || 'No description provided.'}</p>
                    <div class="repo-commits">
                        <h3>Recent Commits</h3>
                        ${commitsHtml}
                    </div>
                `;

                repoContainer.appendChild(repoElement);
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
            repoContainer.innerHTML = '<p>Error loading repositories.</p>';
        }
    }

    // Fetch the repositories once when the page loads
    await fetchAndDisplayRepos();

    // Poll for updates every 5 minutes (300000 ms)
    setInterval(async () => {
        await fetchAndDisplayRepos();
    }, 300000); // 300000 ms = 5 minutes
});
