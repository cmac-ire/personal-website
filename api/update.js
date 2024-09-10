export default function handler(req, res) {
  if (req.method === 'POST') {
    const { repo, message } = req.body;

    console.log(`Received update from repo: ${repo}, with message: ${message}`);

    // Perform any update logic for your website here, such as triggering a rebuild or updating content.
    // You can also store this information in a database, if needed.

    res.status(200).json({ message: 'Update received and processed.' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
