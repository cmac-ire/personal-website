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

setInterval(checkServerHealth, 10000);

checkServerHealth();
