import { Navigate } from 'react-router-dom';

const AdminHome = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to='/login' />;
  }
  return <div className='pt-16'>Admin home</div>;
};

export default AdminHome;
