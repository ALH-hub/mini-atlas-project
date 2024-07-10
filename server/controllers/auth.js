import dbClient from '../utils/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

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
      role: 'student',
      password: hash,
    };

    await dbClient.insertStudent(newUser);

    return res.status(200).json(newUser);
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
      .json({ ...loged, token });
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
      role: 'teacher',
      password: hash,
    };
    await dbClient.insertTeacher(newUser);

    return res.status(200).json(newUser);
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
      .json({ ...loged, token });
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
      role: 'admin',
      password: hash,
    };
    await dbClient.insertAdmin(newUser);

    return res.status(200).json(newUser);
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
      .json({ ...loged, token });
  } catch (err) {
    return res.status(500).json({ status: 500, message: 'server error' });
  }
};

export const sGetme = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct);
    if (!id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    id = new ObjectId(id);
    const user = await dbClient.findStudent({ _id: id });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { password, ...loged } = user;
    return res.status(200).json(loged);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const tGetme = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct);
    if (!id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    id = new ObjectId(id);
    const user = await dbClient.findTeacher({ _id: id });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { password, ...loged } = user;
    return res.status(200).json(loged);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const aGetme = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct);
    if (!id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    id = new ObjectId(id);
    const user = await dbClient.findAdmin({ _id: id });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { password, ...loged } = user;
    return res.status(200).json(loged);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
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
