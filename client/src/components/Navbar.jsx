import user from '/user.png';
import logo from '/logo.png';
import csc from '/csc.png';

const Navbar = () => {
  return (
    <nav className='flex justify-between py-2 px-10 border border-black z-10 bg-white fixed inset-x-0'>
      <img className='rounded-xl' width='40px' src={logo} alt='' />
      <div className='flex items-center gap-4'>
        <img className='rounded-xl' src={csc} alt='' width='40px' />
        <span className='text-sm'>Computer Sc.</span>
      </div>
      <div className='flex items-center gap-4'>
        <img className='rounded-xl' src={user} alt='' width='40px' />
        <span className='text-sm'>user name</span>
      </div>
    </nav>
  );
};

export default Navbar;
