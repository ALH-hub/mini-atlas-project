import express from 'express';
import { getUsers, deleteUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers);
router.delete('/students/:role/:id', deleteUser);

// router.get('/students', getStudents);
// router.get('/teachers', getTeahers);
// router.get('/admins', getAdmins);

export default router;
