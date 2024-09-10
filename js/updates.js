// Replace 'your-github-username' with your GitHub username
const GITHUB_USERNAME = 'cmac-ire';
const REPO_LIST_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;

// Function to fetch and display repository details
async function fetchAndDisplayRepos() {
    try {
        const response = await fetch(REPO_LIST_URL);
        const repos = await response.json();
        const reposContainer = document.getElementById('repositories');

        reposContainer.innerHTML = ''; // Clear previous content

        for (const repo of repos) {
            // Create container for each repo
            const repoBlock = document.createElement('div');
            repoBlock.className = 'repo-block';

            // Add title and description
            const title = document.createElement('div');
            title.className = 'repo-title';
            title.innerHTML = `<strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>`;
            repoBlock.appendChild(title);

            const description = document.createElement('div');
            description.className = 'repo-description';
            description.innerHTML = repo.description || 'No description available';
            repoBlock.appendChild(description);

            // Fetch and add commit history
            const commitsUrl = repo.commits_url.replace('{/sha}', '');
            const commitsResponse = await fetch(commitsUrl);
            const commits = await commitsResponse.json();

            const commitsContainer = document.createElement('div');
            commitsContainer.className = 'repo-commits';
            commitsContainer.innerHTML = '<strong>Recent Commits:</strong>';
            repoBlock.appendChild(commitsContainer);

            commits.slice(0, 5).forEach(commit => {
                const commitBlock = document.createElement('div');
                commitBlock.className = 'commit';
                commitBlock.innerHTML = `<strong>${commit.commit.message}</strong> - ${new Date(commit.commit.committer.date).toLocaleDateString()}`;
                commitsContainer.appendChild(commitBlock);
            });

            // Fetch and add repository contents (tree)
            const treeUrl = `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/git/trees/main?recursive=1`;
            const treeResponse = await fetch(treeUrl);
            const tree = await treeResponse.json();

            const treeContainer = document.createElement('div');
            treeContainer.className = 'tree-diagram';
            treeContainer.innerHTML = '<strong>Repository Contents:</strong>';
            repoBlock.appendChild(treeContainer);

            tree.tree.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.innerHTML = file.path;
                treeContainer.appendChild(fileItem);
            });

            reposContainer.appendChild(repoBlock);
        }
    } catch (error) {
        console.error('Error fetching repository data:', error);
        document.getElementById('repositories').innerHTML = '<p>Error fetching repository data. Please try again later.</p>';
    }
}

// Fetch repositories on page load
window.onload = fetchAndDisplayRepos;
