import user from '/user.png';
import logo from '/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const TeacherNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const role = localStorage.getItem('role');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // clear browser local storage
    localStorage.clear();
    navigate('/login');
    console.log('User logged out');
  };

  return (
    <nav className='flex justify-between py-2 px-10 border border-gray-400 z-10 bg-white fixed inset-x-0'>
      <Link to={`/${role}`}>
        <img className='rounded-xl' width='40px' src={logo} alt='' />
      </Link>
      <div className='flex items-center gap-12'>
        <div className='flex gap-8 items-center'>
          <Link>Home</Link>
          <Link to='/teacher/quiz'>Quiz</Link>
        </div>
        <div className='flex gap-4 items-center'>
          <button onClick={toggleMenu} className='user-logo-btn'>
            <img
              className='rouded-xl'
              src={user}
              alt='User Logo'
              width='40px'
            />{' '}
          </button>
          {isOpen && (
            <div className='absolute top-full right-4 border border-gray w-96 bg-white p-6 flex flex-col gap-2 items-center'>
              <img
                className='rouded-xl'
                src={user}
                alt='User Logo'
                width='30px'
              />
              <div className='flex flex-col gap-2 m-2'>
                <p>
                  <b>Username:</b> {localStorage.getItem('name')}
                </p>
                <p>
                  <b>Email:</b> {localStorage.getItem('email')}
                </p>
                <p>
                  <b>Role:</b> {localStorage.getItem('role')}
                </p>
              </div>
              <button
                className='border border-lightgray-400 p-1 text-sm rounded h-fit hover:bg-blue-200'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <button
            className='border border-lightgray-400 px-2 text-sm rounded h-fit hover:bg-blue-200'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TeacherNav;
