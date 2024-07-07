// import background from '/background.png';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='bg-gradient-to-b from-blue-100 via-transparent to-blue-500 h-screen flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center p-8 gap-2 bg-transparent w-1/2'>
        <h1 className='text-3xl font-bold underline text-blue-600'>Register</h1>
        <form
          action=''
          className='flex flex-col items-center justify-center gap-6 p-8 w-9/12'
        >
          <input
            className='h-10 w-9/12 rounded-md border border-black p-2 focus:outline-none'
            type='text'
            placeholder='name'
            name='name'
            required
          />
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
            className='bg-blue-300 p-2 text-center w-1/3 border rounded-md cursor-pointer hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500'
            type='submit'
          >
            Register
          </button>
          <span className='text-sm'>
            Already have an account?{' '}
            <Link className='text-blue-700 pl-1' to='/login'>
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
