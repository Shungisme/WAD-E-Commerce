const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SIGNER_KEY = "SKqXStAok5tF7FH++jb6YQK1oZ6/Dbjop77dxqyNRtPQ9mxSsvXvGz9a3UevX0s4";

app.post('/generate-token', (req, res) => {
  const { userId, email, name } = req.body;

  if (!userId || !email || !name) {
    return res.status(400).json({ message: "Missing required fields: userId, email, or name" });
  }

  const payload = { userId, email, name };

  const token = jwt.sign(payload, SIGNER_KEY, { expiresIn: '1h' });

  return res.json({ token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});