import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

const StudentHome = () => {
  const [notes, setNotes] = useState([]);
  const [chapter, setChapter] = useState({});
  const [formatContent, setFormatContent] = useState('');
  const storedRole = localStorage.getItem('role');

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

  if (!storedRole) {
    return <Navigate to='/login' />;
  }
  if (storedRole !== 'student') {
    return <Navigate to='/unauthorized' />;
  }
  return (
    <div className='flex'>
      <div className='top-0 left-0 w-[250px] h-full overflow-y-auto pt-20 px-8 fixed border border-gray-400'>
        <h1 className='font-bold mb-2 border-b border-b-gray-400 text-center'>
          Chapters
        </h1>
        <ol className='list-decimal pl-2 '>
          {notes.map((note) => (
            <button
              className='mb-2 cursor-pointer block'
              key={note.chapter}
              onClick={() => setChapter(note)}
            >
              <li>{note.title}</li>
            </button>
          ))}
        </ol>
      </div>
      <div className='px-4 pt-20 ml-[250px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {chapter?.title || 'Select a chapter to view content'}
        </h1>
        <p className='leading-loose'>
          {<div dangerouslySetInnerHTML={{ __html: formatContent }}></div>}
        </p>
      </div>
    </div>
  );
};

export default StudentHome;
