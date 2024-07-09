import { login, logout, register } from '../controllers/auth.js';
import express from 'express';

const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.post('/logout', logout);

export default route;
