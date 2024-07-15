import user from '/user.png';
import logo from '/logo.png';
import { useNavigate, Link } from 'react-router-dom';

const TeacherNav = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
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
      <div className='flex items-center gap-4'>
        <Link>Home</Link>
        <Link to='/teacher/quiz/upload'>Quiz</Link>
        <img className='rounded-xl' src={user} alt='' width='40px' />
        <button
          className='border border-lightgray-400 px-2 text-sm rounded h-fit hover:bg-blue-200'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TeacherNav;
