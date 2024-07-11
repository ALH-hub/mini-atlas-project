import edit from '/edit.svg';
import trash from '/trash.svg';
import add from '/add.svg';
import axios from 'axios';
import DOMPurify from 'dompurify';

import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeacherHome = () => {
  const [notes, setNotes] = useState([]);
  const [chapter, setChapter] = useState({});
  const [formatContent, setFormatContent] = useState('');

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

  useEffect(() => {
    const clean = DOMPurify.sanitize(chapter.content);
    setFormatContent(clean);
  }, [chapter]);

  const storedRole = localStorage.getItem('role');

  if (!storedRole) {
    return <Navigate to='/login' />;
  }
  if (storedRole !== 'teacher') {
    return <Navigate to='/unauthorized' />;
  }
  return (
    <div className='flex'>
      <div className='top-0 left-0 w-[250px] h-full overflow-y-scroll pt-20 px-8 fixed border border-gray-400'>
        <h1 className='font-bold mb-2 border-b border-b-gray-400 text-center'>
          Chapters
        </h1>
        <ol className='list-decimal pl-4 '>
          {notes.map((note) => (
            <button
              className='mb-2 cursor-pointer'
              key={note.chapter}
              onClick={() => setChapter(note)}
            >
              <li>{note.title}</li>
            </button>
          ))}
        </ol>
        <Link to='/write'>
          <img className='w-6 ml-auto mr-6' src={add} alt='' />
        </Link>
      </div>
      <div className='px-4 pt-20 ml-[250px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {chapter?.title || 'Select a chapter to view content'}
        </h1>
        <p className='leading-loose'>
          {<div dangerouslySetInnerHTML={{ __html: formatContent }}></div>}
        </p>
        <div className='flex items-center justify-end gap-6 mt-4'>
          <Link to='/write?edit'>
            <img className='w-6' src={edit} alt='' />
          </Link>
          <img className='w-6' src={trash} alt='' />
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
