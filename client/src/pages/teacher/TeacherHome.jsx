import edit from '/edit.svg';
import trash from '/trash.svg';
import add from '/add.svg';
import axios from 'axios';

import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeacherHome = () => {
  const storage = localStorage.getItem('token');
  const [notes, setNotes] = useState([]);
  const [chapter, setChapter] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:3030/api/notes');
        setNotes(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  if (!storage) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='flex'>
      <div className='top-0 left-0 w-[250px] h-full overflow-y-auto pt-20 px-8 fixed border border-gray-400'>
        <h1 className='font-bold mb-2 border-b border-b-gray-400 text-center'>
          Chapters
        </h1>
        <ol className='list-decimal pl-4 flex flex-col'>
          {notes.map((note) => (
            <button
              className='mb-2'
              key={note.chapter}
              onClick={() => setChapter(note)}
            >
              <li>{note.title}</li>
            </button>
          ))}
        </ol>
        <Link to='/teacher/write'>
          <img className='w-6 ml-auto mr-6' src={add} alt='' />
        </Link>
      </div>
      <div className='px-4 pt-20 ml-[250px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {chapter?.title || 'Title of Chapter here'}
        </h1>
        <p className='leading-loose'>
          {chapter?.content || 'Select a chapter to view content'}
        </p>
        <div className='flex items-center justify-end gap-6 mt-4'>
          <Link to='/teacher/write?edit'>
            <img className='w-6' src={edit} alt='' />
          </Link>
          <img className='w-6' src={trash} alt='' />
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
