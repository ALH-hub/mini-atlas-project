import dbClient from '../config/db.js';

const sct = process.env.SECRET;

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

    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

export const getStudents = async (req, res) => {
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
    // remove all hashed passwords from student array
    students.forEach((student) => {
      delete student.password;
    });
    console.log(students);
    return res.status(200).json(students);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};
