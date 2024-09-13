// Handle registration
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    // Get form values
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        // Make a POST request to the registration endpoint
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('registerMessage').textContent = 'Registration successful! Please log in.';
            document.getElementById('registerMessage').style.color = 'green';
            // Clear the registration form fields
            document.getElementById('registerForm').reset();
        } else {
            // Display the error message returned from the server
            document.getElementById('registerMessage').textContent = data.message || 'Registration failed. Please try again.';
            document.getElementById('registerMessage').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('registerMessage').textContent = 'An error occurred during registration. Please try again.';
        document.getElementById('registerMessage').style.color = 'red';
    }
});

// Handle login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

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
            document.getElementById('loginMessage').textContent = data.message || 'Login failed. Please check your credentials.';
            document.getElementById('loginMessage').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loginMessage').textContent = 'An error occurred during login. Please try again.';
        document.getElementById('loginMessage').style.color = 'red';
    }
});

// Handle forgot password
document.getElementById('forgotPasswordLink').addEventListener('click', (event) => {
    event.preventDefault();
    // Redirect to a password reset page
    window.location.href = '/reset-password.html'; // Adjust to your actual password reset URL
});
