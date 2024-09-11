document.addEventListener('DOMContentLoaded', async () => {
    const repoContainer = document.getElementById('repositories');

    async function fetchAndDisplayRepos() {
        repoContainer.innerHTML = ''; 

        try {
            const response = await fetch('https://api.github.com/users/cmac-ire/repos');
            const repositories = await response.json();

            if (repositories.length > 0) {
                for (const repo of repositories) {
                    const repoElement = document.createElement('div');
                    repoElement.classList.add('repo-block');

                   
                    const commitsResponse = await fetch(`https://api.github.com/repos/cmac-ire/${repo.name}/commits?per_page=1`);
                    const commits = await commitsResponse.json();
                    const recentCommit = commits[0]; 

                   
                    const contentsResponse = await fetch(`https://api.github.com/repos/cmac-ire/${repo.name}/contents`);
                    const contents = await contentsResponse.json();

                 
                    let commitHtml = '<div class="repo-commits">';
                    if (recentCommit) {
                        commitHtml += `
                            <div class="commit">
                                <p><strong>Commit:</strong> ${recentCommit.commit.message}</p>
                                <p><strong>Date:</strong> ${new Date(recentCommit.commit.author.date).toLocaleDateString()}</p>
                            </div>
                            <br>
                            <div class="commit">
                                <p>Repo Contents</p>
                        `;
                    }
                    commitHtml += '</div>';

                
                    let contentsHtml = '<div class="repo-contents">';
                    contents.forEach(file => {
                        contentsHtml += `
                            <div class="repo-file">
                                <p><strong>${file.name}</strong></p>
                            </div>
                        `;
                    });
                    contentsHtml += '</div>';

                   
                    repoElement.innerHTML = `
                        <div class="repo-title">
                            <h1 class="repo-link"><a href="${repo.html_url}" target="_blank">${repo.name}</a></h1>
                        </div>
                        <div class="repo-description">${repo.description || 'No description provided.'}</div>
                        ${commitHtml}
                        ${contentsHtml}
                    `;

                    repoContainer.appendChild(repoElement);
                }
            } else {
                repoContainer.innerHTML = '<p>No repositories found.</p>';
            }
        } catch (error) {
            console.error('Error fetching repositories:', error);
            repoContainer.innerHTML = '<p>Error loading repositories.</p>';
        }
    }

   
    await fetchAndDisplayRepos();

    
    setInterval(async () => {
        await fetchAndDisplayRepos();
    }, 80000);
});
