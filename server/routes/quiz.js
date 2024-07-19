import express from 'express';
import {
  getQuizes,
  createQuiz,
  // updateQuiz,
  deleteQuiz,
} from '../controllers/quiz.js';

const router = express.Router();

router.get('/', getQuizes);
router.post('/', createQuiz);
// router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

export default router;
