import { Navigate } from 'react-router-dom';

const AdminHome = () => {
  const storedRole = localStorage.getItem('role');
  if (storedRole !== 'admin') {
    return <Navigate to='/login' />;
  }
  return <div className='pt-16'>Admin home</div>;
};

export default AdminHome;
