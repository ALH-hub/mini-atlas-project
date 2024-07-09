import dbClient from '../utils/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const sct = process.env.SECRETE;

// student
export const sRegister = async (req, res) => {
  try {
    const user = req.body;
    if (!user || !user.name || !user.email || !user.password)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing Registration information' });

    const verif = await dbClient.findStudent({ email: user.email });
    if (verif)
      return res
        .status(400)
        .json({ status: 400, message: 'user already exist' });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    const newUser = {
      name: user.name,
      email: user.email,
      password: hash,
    };
    const dbUser = await dbClient.insertStudent(newUser);

    const { password, ...loged } = dbUser;
    const token = jwt.sign({ id: dbUser.insertedId }, sct);
    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(loged);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

export const sLogin = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing Login Information' });

    const user = req.body;
    if (!user || !user.email || !user.password)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing email or Password' });

    const dbUser = await dbClient.findStudent({ email: user.email });
    if (!dbUser)
      return res
        .status(404)
        .json({ status: 404, message: 'student NOT FOUND' });

    if (!bcrypt.compareSync(user.password, dbUser.password))
      return res
        .status(400)
        .json({ status: 400, message: 'wrong email or password' });

    const { password, ...loged } = dbUser;
    const token = jwt.sign({ id: dbUser._id }, sct);
    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(loged);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

// teacher
export const tRegister = async (req, res) => {
  try {
    const user = req.body;
    if (!user || !user.name || !user.email || !user.password)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing Registration information' });

    const verif = await dbClient.findTeacher({ email: user.email });
    if (verif)
      return res
        .status(400)
        .json({ status: 400, message: 'teacher already exist' });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    const newUser = {
      name: user.name,
      email: user.email,
      password: hash,
    };
    const dbUser = await dbClient.insertTeacher(newUser);

    const { password, ...loged } = dbUser;
    const token = jwt.sign({ id: dbUser.insertedId }, sct);
    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(loged);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

export const tLogin = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing Login Information' });

    const user = req.body;
    if (!user || !user.email || !user.password)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing email or Password' });

    const dbUser = await dbClient.findTeacher({ email: user.email });
    if (!dbUser)
      return res
        .status(404)
        .json({ status: 404, message: 'teacher not found' });

    if (!bcrypt.compareSync(user.password, dbUser.password))
      return res
        .status(400)
        .json({ status: 400, message: 'wrong email or password' });

    const { password, ...loged } = dbUser;
    const token = jwt.sign({ id: dbUser._id }, sct);
    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(loged);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

// admin
export const aRegister = async (req, res) => {
  try {
    const user = req.body;
    if (!user || !user.name || !user.email || !user.password)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing Registration information' });

    const verif = await dbClient.findAdmin({ email: user.email });
    if (verif)
      return res
        .status(400)
        .json({ status: 400, message: 'admin already exist' });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    const newUser = {
      name: user.name,
      email: user.email,
      password: hash,
    };
    const dbUser = await dbClient.insertAdmin(newUser);

    const { password, ...loged } = dbUser;
    const token = jwt.sign({ id: dbUser.insertedId }, sct);
    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(loged);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

export const aLogin = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing Login Information' });

    const user = req.body;
    if (!user || !user.email || !user.password)
      return res
        .status(400)
        .json({ status: 400, message: 'Missing email or Password' });

    const dbUser = await dbClient.findAdmin({ email: user.email });
    if (!dbUser)
      return res.status(404).json({ status: 404, message: 'admin NOT FOUND' });

    if (!bcrypt.compareSync(user.password, dbUser.password))
      return res
        .status(400)
        .json({ status: 400, message: 'wrong email or password' });

    const { password, ...loged } = dbUser;
    const token = jwt.sign({ id: dbUser._id }, sct);
    return res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(loged);
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

export const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.clearCookie('access_token');

      return res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};
