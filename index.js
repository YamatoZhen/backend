import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🔥 Hello from Render backend!');
});

app.post('/api/reviews', (req, res) => {
  console.log('Review received:', req.body);
  res.json({ message: 'Review saved!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
