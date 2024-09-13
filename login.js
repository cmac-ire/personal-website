// Handle registration
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get form values
    const username = document.getElementById('new_username').value;
    const email = document.getElementById('new_email').value;
    const password = document.getElementById('new_password').value;

    try {
        // Make a POST request to the registration endpoint
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = 'Registration successful! Please log in.';
            // Optionally clear the registration form fields
            document.getElementById('registerForm').reset();
        } else {
            // Display the error message returned from the server
            document.getElementById('message').textContent = data.message || 'Registration failed. Please try again.';
        }
    } catch (error) {
        // Log and display any errors encountered during the request
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred during registration. Please try again.';
    }
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Make a POST request to the login endpoint
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store username in local storage
            localStorage.setItem('username', username);

            // Redirect to the home page or wherever necessary
            window.location.href = 'index.html'; // Adjust path if necessary
        } else {
            // Display the error message returned from the server
            document.getElementById('message').textContent = data.message || 'Login failed. Please check your credentials.';
        }
    } catch (error) {
        // Log and display any errors encountered during the request
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred during login. Please try again.';
    }
});

// Handle forgot password
document.getElementById('forgotPasswordLink').addEventListener('click', (event) => {
    event.preventDefault();
    // Redirect to a password reset page or show a modal
    window.location.href = '/forgot-password'; // Adjust to your actual password reset URL
});
