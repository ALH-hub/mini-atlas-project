import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('Welcome to atlas api service!!');
});

app.use('/api/auth', authRoutes);

app.listen(3030, () => {
  console.log('connected on port 3030!!');
});
