// Function to perform the health check
async function checkServerHealth() {
    try {
        const response = await fetch('https://bittersweet-bald-haircut.glitch.me/health');
        const data = await response.json();
        if (response.ok) {
            console.log(`Server Health Check OK: ${data.message}`);
        } else {
            console.error(`Health Check Failed: ${data.message}`);
        }
    } catch (error) {
        console.error(`Health Check Error: ${error.message}`);
    }
}

// Run the health check every 5 minutes (300000 milliseconds)
setInterval(checkServerHealth, 300000);

// Run an initial check when the script loads
checkServerHealth();
