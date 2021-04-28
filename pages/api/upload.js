export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const body = req.body
    res.status(200).json({ response: body })
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'sorry other method is disable for now' })
  }
}
