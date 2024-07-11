import dbClient from '../utils/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';

dotenv.config();

const sct = process.env.SECRETE;

export const getNotes = async (req, res) => {
  try {
    const notes = await dbClient.getNotes();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const createNote = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct); // Use let for id
    if (!id) {
      return res.status(401).json({ message: 'Unauthorized', id });
    }

    id = new ObjectId(id);
    const user = await dbClient.findTeacher({
      _id: id,
    });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized', user });
    }

    const note = req.body;
    if (!note.title || !note.content) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const newNote = await dbClient.insertNote({
      title: note.title,
      content: note.content,
      chapter: (await dbClient.countNotes()) + 1,
      user: user._id,
    });
    return res
      .status(201)
      .json({ status: 201, message: 'Note created', newNote });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, sct);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await dbClient.findStudent({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const note = req.body;
    const newNote = await dbClient.updateNote(
      { chapter: req.params.id },
      {
        title: note.title,
        content: note.content,
        user: user._id,
      },
    );
    return res.status(200).json({ status: 200, message: 'Note updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, sct);
    if (!decoded) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await dbClient.findNote({ _id: decoded.id });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newNote = await dbClient.deleteNote({ chapter: req.params.id });
    return res.status(200).json({ status: 200, message: 'Note deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};
