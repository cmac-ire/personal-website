const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Create and connect to SQLite database
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) console.error('Error opening database:', err.message);
    else console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);
});

app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from the root directory

// Registration Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function (err) {
        if (err) return res.status(500).json({ message: 'Error creating user' });
        res.status(200).json({ message: 'User registered successfully' });
    });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!row) return res.status(400).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, row.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

        res.status(200).json({ message: 'Login successful' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
