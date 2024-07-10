import express from 'express';
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../controllers/notes.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
