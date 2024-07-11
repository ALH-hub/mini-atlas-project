import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { baseRoute } from '../../config';

const Login = () => {
  const [role, setRole] = useState('student');
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigation = useNavigate();

  const handleUserTypeChange = (event) => {
    setRole(event.target.value);
  };

  const handleInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const hadleSubmission = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseRoute}/auth/${role}/login`,
        {
          email: user.email,
          password: user.password,
        },
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', role);
      navigation(`/${role}`);
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
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

  const storedRole = localStorage.getItem('role');
  if (storedRole) {
    return <Navigate to={`/${storedRole}`} />;
  }
  return (
    <div className=' h-screen flex justify-center items-center'>
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
            onChange={handleInputChange}
          />
          <input
            className='h-10 w-9/12 rounded-md border border-black p-2 focus:outline-none'
            type='password'
            placeholder='password'
            name='password'
            required
            onChange={handleInputChange}
          />
          <button
            className='bg-blue-300 p-2 text-center w-1/3 border border-blue-300 rounded-md cursor-pointer hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500'
            type='submit'
            onClick={hadleSubmission}
          >
            Login
          </button>
          {error && <span className='text-red-500 text-xs'>{error}</span>}
          <div className='flex flex-col items-center'>
            <span className='text-sm'>
              Don&apos;t have an account?{' '}
              <Link className='text-blue-700 w-fit' to='/register'>
                Register
              </Link>
            </span>
            <span className='text-sm '>Login as a: {renderLoginOptions()}</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
