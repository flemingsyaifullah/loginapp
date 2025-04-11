import 'dotenv/config'; 
import express from 'express';
import cors from 'cors'; 
import userRoutes from '../routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

app.get('/api/health-check', (_, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
