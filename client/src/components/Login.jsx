import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [role, setRole] = useState('student');

  const handleUserTypeChange = (event) => {
    setRole(event.target.value);
  };

  const renderLoginOptions = () => {
    const options = ['student', 'teacher', 'admin'];
    const filteredOptions = options.filter((option) => option !== role);

    return (
      <select
        value={role}
        onChange={handleUserTypeChange}
        className='p-1 bg-transparent text-blue-600 focus:outline-none'
      >
        <option value='student'>{role}</option>
        {filteredOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className='bg-gradient-to-b from-blue-100 via-transparent to-blue-500 h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center p-8 gap-2 bg-transparent w-1/2'>
        <h1 className='text-3xl font-bold underline text-blue-600'>
          Login as {role}
        </h1>
        <form
          action=''
          className='flex flex-col items-center justify-center gap-6 p-8 w-9/12'
        >
          <input
            className='h-10 w-9/12 rounded-md border border-black p-2 focus:outline-none'
            type='email'
            placeholder='email'
            name='email'
            required
          />
          <input
            className='h-10 w-9/12 rounded-md border border-black p-2 focus:outline-none'
            type='password'
            placeholder='password'
            name='password'
            required
          />
          <button
            className='bg-blue-300 p-2 text-center w-1/3 border border-blue-300 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500'
            type='submit'
          >
            Login
          </button>
          <div className='flex flex-col items-center'>
            <span className='text-sm'>
              Don&apos;t have an account?{' '}
              <Link className='text-blue-700 w-fit' to='/register'>
                Register
              </Link>
            </span>
            <span className='text-sm '>Login as a: {renderLoginOptions()}</span>
          </div>
          {console.log('This is the current role: ', role)}
        </form>
      </div>
    </div>
  );
};

export default Login;
