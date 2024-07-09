import {
  aLogin,
  aRegister,
  logout,
  sLogin,
  sRegister,
  tLogin,
  tRegister,
} from '../controllers/auth.js';
import express from 'express';

const route = express.Router();

// student
route.post('/student/register', sRegister);
route.post('/student/login', sLogin);

// teacher
route.post('/teacher/register', tRegister);
route.post('/teacher/login', tLogin);

// admin
route.post('/admin/register', aRegister);
route.post('/admin/login', aLogin);

route.post('/logout', logout);

export default route;
