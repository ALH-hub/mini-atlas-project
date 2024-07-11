import edit from '/edit.svg';
import trash from '/trash.svg';
import add from '/add.svg';
import axios from 'axios';
import DOMPurify from 'dompurify';

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeacherHome = () => {
  const [notes, setNotes] = useState([]);
  const [chapter, setChapter] = useState({});
  const [formatContent, setFormatContent] = useState('');
  const storedRole = localStorage.getItem('role');
  const navigate = useNavigate();

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

  const handleDeleteNote = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3030/api/notes/${chapter.chapter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log(res);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const clean = DOMPurify.sanitize(chapter.content);
    setFormatContent(clean);
  }, [chapter]);

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
        {formatContent && (
          <div className='flex items-center justify-end gap-6 mt-4'>
            <Link to='/write?edit' state={chapter}>
              <img className='w-[20px]' src={edit} alt='' />
            </Link>
            <button onClick={handleDeleteNote}>
              <img className='w-[20px]' src={trash} alt='' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherHome;
