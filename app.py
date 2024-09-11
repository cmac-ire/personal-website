from flask import Flask, request, jsonify, render_template
import json

app = Flask(__name__)

# In-memory user store (for demonstration purposes)
users = {}

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users:
        return jsonify({"message": "User already exists."}), 400
    
    users[username] = password
    return jsonify({"message": "User registered successfully!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    if username in users and users[username] == password:
        return jsonify({"message": "Login successful!"}), 200
    else:
        return jsonify({"message": "Invalid credentials."}), 401

if __name__ == '__main__':
    app.run(debug=True)
