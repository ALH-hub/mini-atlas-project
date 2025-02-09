import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';
import userRoutes from './routes/users.js';
import quizRoutes from './routes/quiz.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('Welcome to atlas api service!!');
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(3030, () => {
  console.log('connected on port 3030!!');
  console.log('trying to connect to db...');
});
