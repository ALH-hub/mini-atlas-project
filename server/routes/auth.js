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
route.post('/sregister', sRegister);
route.post('/slogin', sLogin);

// teacher
route.post('/tregister', tRegister);
route.post('/tlogin', tLogin);

// admin
route.post('/aregister', aRegister);
route.post('/alogin', aLogin);

route.post('/logout', logout);

export default route;
