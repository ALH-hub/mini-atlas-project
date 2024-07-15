import user from '/user.png';
import logo from '/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // clear browser local storage
    localStorage.clear();
    navigate('/login');
    console.log('User logged out');
  };

  return (
    <nav className='flex justify-between py-2 px-10 border border-gray-400 z-10 bg-white fixed inset-x-0'>
      <img className='rounded-xl' width='40px' src={logo} alt='' />

      <div className='flex items-center gap-4'>
        <button onClick={toggleMenu} className='user-logo-btn'>
          <img className='rouded-xl' src={user} alt='User Logo' width='40px' />{' '}
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
          className='border border-lightgray-400 p-1 text-sm rounded h-fit hover:bg-blue-200'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// import { useState } from 'react';

// const [isOpen, setIsOpen] = useState(false);
// const [showUsername, setShowUsername] = useState(false);

// const toggleMenu = () => setIsOpen(!isOpen);

// const handleLogout = () => {
//   // Implement logout logic here
//   console.log('User logged out');
//   setIsOpen(false);
// };
{
  /* <button
  onMouseEnter={() => setShowUsername(true)}
  onMouseLeave={() => setShowUsername(false)}
  onClick={toggleMenu}
  className='user-logo-btn'
>
  <img className='rouded-xl' src={user} alt='User Logo' width='40px' />{' '}
  {showUsername && <span>{user.username}</span>}
</button>
{isOpen && (
  <div className='absolute top-full right-4 border border-gray h-32 w-64 bg-white'>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
    <p>Role: {user.role}</p>
    <button onClick={handleLogout}>Logout</button>
  </div>
  )} */
}
