export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json({ response: req })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'sorry other method is disable for now' })
  }
}
