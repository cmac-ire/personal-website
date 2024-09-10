// api/get-updates.js

export default function handler(req, res) {
    if (req.method === 'GET') {
      // Return the list of updates
      res.status(200).json({ updates });
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  