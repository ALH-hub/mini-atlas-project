import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const Write = ({ value }) => {
  const [notes, setNotes] = useState({
    title: '',
    content: '',
  });

  const handleInputChange = (content) => {
    setNotes({ ...notes, content });
  };

  const handleSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3030/api/notes',
        notes,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

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
          id='title'
          onChange={handleInputChange}
          required
        />
        <ReactQuill
          className='w-full p-2 rounded-md mb-4 h-4/5'
          theme='snow'
          value={value ? value : ''}
          placeholder='Enter Chapter content here'
          id='content'
          name='content'
          onChange={handleInputChange}
        />
        <div className='flex justify-end w-full gap-8 mt-4'>
          <button
            onClick={handleSubmission}
            className='border border-lightgray-400 px-2 py-1 text-sm rounded h-fit hover:bg-blue-200'
          >
            Save
          </button>
          <button className='border border-lightgray-400 px-2 py-1 text-sm rounded h-fit hover:bg-blue-200'>
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
