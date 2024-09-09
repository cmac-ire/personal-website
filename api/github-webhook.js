// api/github-webhook.js

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        // Log the request body for debugging
        console.log('Received webhook payload:', req.body);

        // Respond with a 200 status code
        res.status(200).json({ message: 'Webhook received successfully' });
    } else {
        // Respond with 405 Method Not Allowed for non-POST requests
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};