import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URL;

class DBClient {
  constructor() {
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
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

  async findChapter(chap) {
    return this.db.collection('chapters').findOne(chap);
  }

  async insertChapter(chap) {
    return this.db.collection('chapters').insertOne(chap);
  }

  async findStudent(stud) {
    return this.db.collection('students').findOne(stud);
  }

  async insertStudent(stud) {
    return this.db.collection('students').insertOne(stud);
  }

  async findTeacher(user) {
    return this.db.collection('teachers').findOne(user);
  }

  async insertTeacher(user) {
    return this.db.collection('teachers').insertOne(user);
  }

  async findAdmin(user) {
    return this.db.collection('admin').findOne(user);
  }

  async insertAdmin(user) {
    return this.db.collection('admin').insertOne(user);
  }
  // ... (rest of your code for find/insert methods)
}

const dbClient = new DBClient();

export default dbClient;
