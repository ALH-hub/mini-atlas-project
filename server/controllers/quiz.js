import dbClient from '../utils/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

dotenv.config();

const sct = process.env.SECRETE;

export const getQuizes = async (req, res) => {
  try {
    const quizes = await dbClient.getQuizes();
    return res.status(200).json(quizes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct); // Use let for id
    if (!id) {
      return res.status(403).json({ message: 'Forbidden', id });
    }

    id = new ObjectId(id);
    const user = await dbClient.findTeacher({
      _id: id,
    });
    if (!user) {
      return res.status(403).json({ message: 'Forbidden', user });
    }

    const quiz = req.body;
    if (!quiz) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const newQuiz = await dbClient.insertQuiz(quiz[0]);
    return res.status(201).json(newQuiz);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct); // Use let for id
    if (!id) {
      return res.status(401).json({ message: 'Forbidden jwt', id });
    }

    id = new ObjectId(id);
    const user = await dbClient.findTeacher({
      _id: id,
    });
    if (!user) {
      return res.status(403).json({ message: 'Forbidden', user });
    }

    const newNote = await dbClient.deleteQuiz({
      _id: new ObjectId(req.params.id),
    });

    return res.status(200).json({ status: 200, message: 'Quiz deleted' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Server Error', error });
  }
};
