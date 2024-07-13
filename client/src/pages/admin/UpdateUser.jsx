import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseRoute } from '../../../config.js';
import userImg from '/user.png';

const UpdateUser = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: state.name || '',
    email: state.email || '',
    role: state.role || '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (user.password === '') {
        // do not submit form
        return;
      }
      axios.put(`${baseRoute}/users/${state.role}/${state._id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setUser({
      name: '',
      email: '',
      role: '',
      password: '',
    });
    navigate('/admin');
  };

  return (
    <div className='pt-32 flex justify-center'>
      <form
        className='flex flex-col gap-4 border p-8  border-gray-400 items-center h-full'
        action=''
      >
        <img src={userImg} className='w-32' alt='' />
        <div className='w-full flex justify-center gap-8 items-center'>
          <label htmlFor='name' className='text-left w-14'>
            Name:
          </label>
          <input
            className='border border-gray-400 h-10 p-4 rounded focus:outline-none'
            type='text'
            name='name'
            id='name'
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center gap-8 items-center w-full'>
          <label htmlFor='email' className='text-left w-14'>
            Email:
          </label>
          <input
            className='border border-gray-400 p-4 h-10 rounded focus:outline-none'
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex justify-center gap-8 items-center w-full'>
          <label htmlFor='password' className='text-left w-14'>
            Password:
          </label>
          <input
            className='border border-gray-400 p-4 h-10 rounded focus:outline-none'
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
            required
          />
        </div>
        <div className='w-full flex justify-center gap-4 mt-6'>
          <label htmlFor='role'>Role:</label>
          <select
            className='bg-white focus:outline-none border border-gray-400 focus:outline-none'
            type='text'
            name='role'
            id='role'
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value='student'>Student</option>
            <option value='teacher'>Teacher</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <div className='flex justify-center gap-8 mt-4 w-full'>
          <button
            className='border border-gray-300 w-18 text-center text-sm  p-1 rounded bg-blue-500 text-white hover:bg-white hover:text-blue-500'
            onClick={handleSubmit}
            type='submit'
          >
            Update
          </button>
          <button
            onClick={handleCancel}
            className='border border-gray-300 w-18 text-center text-sm  p-1 rounded bg-blue-500 text-white hover:bg-white hover:text-blue-500'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
