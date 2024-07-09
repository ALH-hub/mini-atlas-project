import {
  aLogin,
  aLogout,
  aRegister,
  sLogin,
  sLogout,
  sRegister,
  tLogin,
  tLogout,
  tRegister,
} from '../controllers/auth.js';
import express from 'express';

const route = express.Router();

// student
route.post('/sregister', sRegister);
route.post('/slogin', sLogin);
route.post('/slogout', sLogout);

// teacher
route.post('/tregister', tRegister);
route.post('/tlogin', tLogin);
route.post('/tlogout', tLogout);

// admin
route.post('/aregister', aRegister);
route.post('/alogin', aLogin);
route.post('/alogout', aLogout);

export default route;
