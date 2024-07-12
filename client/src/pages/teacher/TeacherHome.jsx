import edit from '/edit.svg';
import trash from '/trash.svg';
import add from '/add.svg';
import axios from 'axios';

import DOMPurify from 'dompurify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseRoute } from '../../../config';

const TeacherHome = () => {
  const [notes, setNotes] = useState([]);
  const [chapter, setChapter] = useState({});
  const [formatContent, setFormatContent] = useState('');
  const storedRole = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(`${baseRoute}/notes`);
        setNotes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleDeleteNote = async () => {
    try {
      const res = await axios.delete(`${baseRoute}/notes/${chapter.chapter}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
      <div className='top-0 left-0 w-[250px] h-full overflow-y-auto pt-20 pl-4 fixed border border-gray-400'>
        <div className='flex justify-between items-center pl-2 pr-4 mb-2'>
          <h1 className='font-bold mb-2 border-b border-b-gray-400 text-center'>
            Chapters
          </h1>
          <Link to='/write'>
            <img className='w-5 ml-auto' src={add} alt='' />
          </Link>
        </div>
        <ol className='list-decimal px-2'>
          {notes.map((note) => (
            <button
              className='mb-[10px] cursor-pointer block'
              key={note.chapter}
              onClick={() => setChapter(note)}
            >
              <li>{note.title}</li>
            </button>
          ))}
        </ol>
      </div>
      <div className='p-8 pt-20 ml-[250px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {chapter?.title || 'Select a chapter to view content'}
        </h1>
        <p className='leading-loose'>
          {<div dangerouslySetInnerHTML={{ __html: formatContent }}></div>}
        </p>
        {formatContent && (
          <div className='flex items-center justify-end gap-6 mt-4'>
            <Link className='w-[20px] rounded' to='/write?edit' state={chapter}>
              <img className='w-fit rounded' src={edit} alt='' />
            </Link>
            <button className='w-[17px] rounded' onClick={handleDeleteNote}>
              <img className='w-fit rounded' src={trash} alt='' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherHome;
