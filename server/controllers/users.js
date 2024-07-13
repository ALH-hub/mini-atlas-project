import dbClient from '../utils/db.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const sct = process.env.SECRETE;

export const getUsers = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct); // Use let for id
    if (!id) {
      return res.status(401).json({ message: 'Unauthorized jwt', id });
    }

    id = new ObjectId(id);
    const user = await dbClient.findAdmin({
      _id: id,
    });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized', user });
    }

    const students = await dbClient.findStudents();
    const teachers = await dbClient.findTeachers();
    const admins = await dbClient.findAdmins();

    const users = students.concat(teachers, admins);
    // remove all hashed passwords from user array
    users.forEach((user) => {
      delete user.password;
    });

    // sort users by role
    users.sort((a, b) => {
      if (a.role < b.role) {
        return -1;
      }
      if (a.role > b.role) {
        return 1;
      }
      return 0;
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    let { id } = jwt.verify(token, sct); // Use let for id
    if (!id) {
      console.log('admin id: ', id);
      return res.status(401).json({ message: 'Unauthorized jwt', id });
    }

    id = new ObjectId(id);
    const user = await dbClient.findAdmin({
      _id: id,
    });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized', user });
    }

    const uId = req.params.id;
    const uRole = req.params.role;
    const sId = new ObjectId(uId);
    let userToDel;

    if (!uRole || !uId) {
      return res.status(400).json({ message: 'Bad request' });
    }

    if (uRole === 'student') {
      userToDel = await dbClient.findStudent({
        _id: sId,
      });
    }

    if (uRole === 'teacher') {
      userToDel = await dbClient.findTeacher({
        _id: sId,
      });
    }

    if (uRole === 'admin') {
      userToDel = await dbClient.findAdmin({
        _id: sId,
      });
    }

    if (!userToDel) {
      return res.status(404).json({ message: 'User not found' });
    }

    const result = await dbClient.deleteUser(userToDel);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// export const getStudents = async (req, res) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     const token = authHeader.split(' ')[1];
//     let { id } = jwt.verify(token, sct); // Use let for id
//     if (!id) {
//       return res.status(401).json({ message: 'Unauthorized jwt', id });
//     }

//     id = new ObjectId(id);
//     const user = await dbClient.findAdmin({
//       _id: id,
//     });
//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized', user });
//     }

//     const students = await dbClient.findStudents();
//     // remove all hashed passwords from student array
//     students.forEach((student) => {
//       delete student.password;
//       object;
//     });
//     console.log(students);
//     return res.status(200).json(students);
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ message: 'Server error', error: error.message });
//   }
// };
