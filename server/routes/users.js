import express from 'express';
import {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.delete('/:role/:id', deleteUser);
router.put('/:role/:id', updateUser);
router.post('/', createUser);

// router.get('/students', getStudents);
// router.get('/teachers', getTeahers);
// router.get('/admins', getAdmins);

export default router;
