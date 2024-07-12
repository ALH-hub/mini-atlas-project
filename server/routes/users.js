import express from 'express';
import {
  getStudents,
  getTeahers,
  getAdmins,
  getUsers,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/students', getStudents);
// router.get('/teachers', getTeahers);
// router.get('/admins', getAdmins);

export default router;
