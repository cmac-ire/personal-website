// pages/api/github-webhook.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Handle the GitHub webhook payload
        const payload = req.body;
        console.log('Received webhook payload:', payload);

        // Respond with a 200 status code to acknowledge receipt
        res.status(200).json({ message: 'Webhook received successfully' });
    } else {
        // Respond with 405 Method Not Allowed for non-POST requests
        res.status(405).end();
    }
}
