const axios = require('axios');
const fs = require('fs');
const path = require('path');

const REPO_OWNER = 'cmac-ire'; // Replace with your GitHub username
const REPO_NAME = 'ai-home-automation-assistant'; // Replace with your repository name
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

async function fetchRepoData() {
    try {
        const [repoData, contents, commits] = await Promise.all([
            axios.get(GITHUB_API_URL),
            axios.get(`${GITHUB_API_URL}/contents`),
            axios.get(`${GITHUB_API_URL}/commits`)
        ]);

        const data = {
            repo: repoData.data,
            contents: contents.data,
            commits: commits.data
        };

        const filePath = path.join(__dirname, 'latest-update.txt');
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error fetching repository data:', error);
    }
}

// Fetch data every 5 minutes
setInterval(fetchRepoData, 5 * 60 * 1000); // 5 minutes

// Initial fetch
fetchRepoData();
