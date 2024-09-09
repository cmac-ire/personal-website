// api/github-webhook.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Extract the JSON payload from the request body
        const payload = req.body;

        // Example: Log the received payload
        console.log('Received GitHub webhook payload:', payload);

        // Process the payload (e.g., trigger a deployment, update your website)
        // Your custom logic here

        res.status(200).json({ message: 'Webhook received' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
