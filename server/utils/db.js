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
      console.log('Connected to database');
    } catch (error) {
      console.error('Could not connect to database\n', error);
      // Consider retrying the connection or handling the error gracefully
    }
  }

  isAlive() {
    return !!this.db;
  }

  async findNote(chap) {
    return this.db.collection('notes').findOne(chap);
  }

  async getNotes() {
    return this.db.collection('notes').find().toArray();
  }

  async countNotes() {
    return this.db.collection('notes').countDocuments();
  }

  async insertNote(chap) {
    return this.db.collection('notes').insertOne(chap);
  }

  async updateNote(id, chap) {
    return this.db.collection('notes').updateOne(id, chap);
  }

  async deleteNote(chap) {
    return this.db.collection('notes').deleteOne(chap);
  }

  async findStudent(stud) {
    return this.db.collection('students').findOne(stud);
  }

  async insertStudent(stud) {
    return this.db.collection('students').insertOne(stud);
  }

  async deleteStudent(stud) {
    return this.db.collection('students').deleteOne(stud);
  }

  async findTeacher(id) {
    return this.db.collection('teachers').findOne(id);
  }

  async insertTeacher(user) {
    return this.db.collection('teachers').insertOne(user);
  }

  async deleteTeacher(user) {
    return this.db.collection('teachers').deleteOne(user);
  }

  async findAdmin(user) {
    return this.db.collection('admin').findOne(user);
  }

  async insertAdmin(user) {
    return this.db.collection('admin').insertOne(user);
  }

  async deleteAdmin(user) {
    return this.db.collection('admin').deleteOne(user);
  }

  // ... (rest of your code for find/insert methods)
}

const dbClient = new DBClient();

export default dbClient;
