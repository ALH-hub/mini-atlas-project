import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URL ? process.env.URL : 'mongodb://localhost:27017';

class DBClient {
  constructor() {
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      const connectTimeoutMS = 60000;
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS,
      });
      await client.connect();
      this.db = client.db('atlasdb');
      console.log('Connected to database!!!');
    } catch (error) {
      console.error('Could not connect to database\n', error);
    }
  }

  isAlive() {
    return !!this.db;
  }

  async findNote(chap) {
    try {
      return await this.db.collection('notes').findOne(chap);
    } catch (error) {
      console.error('Error finding note:', error);
      throw error;
    }
  }

  async getNotes() {
    try {
      return await this.db.collection('notes').find().toArray();
    } catch (error) {
      console.error('Error getting all notes:', error);
      throw error;
    }
  }

  async countNotes() {
    try {
      return await this.db.collection('notes').countDocuments();
    } catch (error) {
      console.error('Error counting notes:', error);
      throw error;
    }
  }

  async insertNote(chap) {
    try {
      return await this.db.collection('notes').insertOne(chap);
    } catch (error) {
      console.error('Error inserting note:', error);
      throw error;
    }
  }

  async updateNote(filter, update) {
    try {
      const result = await this.db
        .collection('notes')
        .updateOne(filter, { $set: update });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteNote(chap) {
    try {
      return await this.db.collection('notes').deleteOne(chap);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }

  async findStudent(stud) {
    try {
      return await this.db.collection('students').findOne(stud);
    } catch (error) {
      console.error('Error finding student:', error);
      throw error;
    }
  }

  async findStudents() {
    try {
      return await this.db.collection('students').find().toArray();
    } catch (error) {
      console.error('Error finding students:', error);
      throw error;
    }
  }

  async insertStudent(stud) {
    try {
      return await this.db.collection('students').insertOne(stud);
    } catch (error) {
      console.error('Error inserting student:', error);
      throw error;
    }
  }

  async deleteStudent(stud) {
    try {
      return await this.db.collection('students').deleteOne(stud);
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  async findTeacher(id) {
    try {
      return await this.db.collection('teachers').findOne(id);
    } catch (error) {
      console.error('Error finding teacher:', error);
      throw error;
    }
  }

  async insertTeacher(user) {
    try {
      return await this.db.collection('teachers').insertOne(user);
    } catch (error) {
      console.error('Error inserting teacher:', error);
      throw error;
    }
  }

  async deleteTeacher(user) {
    try {
      return await this.db.collection('teachers').deleteOne(user);
    } catch (error) {
      console.error('Error deleting teacher:', error);
      throw error;
    }
  }

  async findTeachers() {
    try {
      return await this.db.collection('teachers').find().toArray();
    } catch (error) {
      console.error('Error finding teachers:', error);
      throw error;
    }
  }

  async findAdmin(user) {
    try {
      return await this.db.collection('admin').findOne(user);
    } catch (error) {
      console.error('Error finding admin:', error);
      throw error;
    }
  }

  async findAdmins() {
    try {
      return await this.db.collection('admin').find().toArray();
    } catch (error) {
      console.error('Error finding admins:', error);
      throw error;
    }
  }

  async insertAdmin(user) {
    try {
      return await this.db.collection('admin').insertOne(user);
    } catch (error) {
      console.error('Error inserting admin:', error);
      throw error;
    }
  }

  async deleteAdmin(user) {
    try {
      return await this.db.collection('admin').deleteOne(user);
    } catch (error) {
      console.error('Error deleting admin:', error);
      throw error;
    }
  }

  async deleteUser(user) {
    try {
      if (user.role === 'student') {
        return await this.db.collection('students').deleteOne(user);
      }
      if (user.role === 'teacher') {
        return await this.db.collection('teachers').deleteOne(user);
      }
      if (user.role === 'admin') {
        return await this.db.collection('admin').deleteOne(user);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
  // ... (rest of your code for find/insert methods)
}

const dbClient = new DBClient();

export default dbClient;
