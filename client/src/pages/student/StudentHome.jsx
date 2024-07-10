import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentHome = () => {
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
      <div className='top-0 left-0 h-full overflow-y-auto pt-20 px-8 fixed border border-gray-400'>
        <h1 className='font-bold mb-2 border-b border-b-gray-400 text-center'>
          Chapters
        </h1>
        <ol className='list-decimal pl-4 flex flex-col'>
          {notes.map((note) => (
            <button key={note.chapter} onClick={() => setChapter(note)}>
              <li>{note.title}</li>
            </button>
          ))}
        </ol>
      </div>
      <div className='px-4 pt-20 ml-[200px] flex-1 pb-4 text-justify '>
        <h1 className='text-center font-bold text-xl mb-4 border-b border-b-gray-400'>
          {chapter?.title || 'Title of Chapter here'}
        </h1>
        <p className='leading-loose'>
          {chapter?.content || 'Select a chapter to view content'}
        </p>
      </div>
    </div>
  );
};

export default StudentHome;
