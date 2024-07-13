import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseRoute } from '../../../config.js';

const UpdateUser = () => {
  const state = useLocation().state;
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
    console.log(user);
    try {
      {
        console.log('user id to update', state._id);
      }
      axios.put(`${baseRoute}/users/${state.role}/${state._id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='pt-20 flex justify-center'>
      <form
        className='flex flex-col gap-4 border p-8 justify-center border-black w-4/5'
        action=''
      >
        <div className='w-full flex justify-center gap-4'>
          <label htmlFor='name'>Name</label>
          <input
            className='border border-gray-400'
            type='text'
            name='name'
            id='name'
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex justify-center gap-4'>
          <label htmlFor='email'>Email</label>
          <input
            className='border border-gray-400'
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex justify-center gap-4'>
          <label htmlFor='password'>Password</label>
          <input
            className='border border-gray-400'
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
          />
        </div>
        <div className='w-full flex justify-center gap-4'>
          <label htmlFor='role'>Role</label>
          <select
            className='border border-gray-400'
            type='text'
            name='role'
            id='role'
            value={user.role}
            onChange={handleChange}
          >
            <option value='student'>Student</option>
            <option value='teacher'>Teacher</option>
            <option value='admin'>Admin</option>
          </select>
        </div>
        <button onClick={handleSubmit} type='submit'>
          Update
        </button>
      </form>
      {console.log(user)}
    </div>
  );
};

export default UpdateUser;
