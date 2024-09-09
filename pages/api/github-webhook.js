export default async function handler(req, res) {
    // Check if the request method is POST
    if (req.method === 'POST') {
        // Process the payload from GitHub
        const payload = req.body;
        
        // Log payload or handle webhook data
        console.log('Payload received:', payload);

        // Example: Respond with a success message
        res.status(200).json({ message: 'Webhook received' });
    } else {
        // Respond with 405 Method Not Allowed for non-POST requests
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
