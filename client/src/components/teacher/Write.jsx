import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = (value) => {
  return (
    <div className='pt-20 h-screen'>
      <form
        action=''
        className='flex flex-col gap-6 items-center h-5/6 border border-black p-4 w-2/3 mx-auto rounded-md shadow-md'
      >
        <input
          className='w-1/2 p-2 border border-gray-300 rounded-md shadow-sm'
          placeholder='Enter Chapter title here'
          type='text'
          name='title'
          id='title'
        />
        <ReactQuill
          className='w-full p-2 rounded-md h-4/6 mb-4'
          theme='snow'
          value={value ? value : ''}
          placeholder='Enter Chapter content here'
          id='content'
          name='content'
        />
        <div className='flex justify-between gap-8 mt-4'>
          <button className='bg-blue-300 p-2 rounded-md shadow-md'>Save</button>
          <button className='bg-blue-300 p-2 rounded-md shadow-md'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
