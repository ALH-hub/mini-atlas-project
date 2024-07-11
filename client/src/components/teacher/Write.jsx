import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const Write = () => {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || '');
  const [content, setContent] = useState(state?.content || '');
  const storedRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
      state
        ? await axios.put(
            `http://localhost:3030/api/notes/${state.chapter}`,
            { title, content },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          )
        : await axios.post(
            'http://localhost:3030/api/notes',
            { title, content },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            },
          );
      navigate(`/${storedRole}`);
    } catch (error) {
      console.error('error occured', error);
    }
  };

  const handleCancel = () => {
    navigate(`/${storedRole}`);
  };

  if (!storedRole) {
    return <Navigate to='/login' />;
  }
  console.log(storedRole);
  if (storedRole !== 'teacher' && storedRole !== 'admin') {
    return <Navigate to='/unauthorized' />;
  }

  return (
    <div className='flex flex-grow overflow-auto justify-center pt-40'>
      <form
        action=''
        className='flex flex-col gap-6 items-center h-5/6 border border-gray-300 p-4 w-[65rem] mx-auto rounded-md shadow-md'
      >
        <input
          className='w-1/2 p-2 border border-gray-300 text-sm rounded-md shadow-sm'
          placeholder='Enter Chapter title here'
          type='text'
          name='title'
          value={title}
          id='title'
          onChange={handleTitleChange}
          required
        />
        <ReactQuill
          className='w-full p-2 rounded-md mb-4 h-4/5'
          theme='snow'
          placeholder='Enter Chapter content here'
          id='content'
          value={content}
          name='content'
          onChange={handleContentChange}
          required
        />
        <div className='flex justify-end w-full gap-8 mt-4'>
          <button
            onClick={handleSubmission}
            className='border border-lightgray-400 px-2 py-1 text-sm rounded h-fit hover:bg-blue-200'
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className='border border-lightgray-400 px-2 py-1 text-sm rounded h-fit hover:bg-blue-200'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

Write.propTypes = {
  value: PropTypes.string,
};

export default Write;
