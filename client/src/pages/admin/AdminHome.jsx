import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AdminHome = () => {
  useEffect(() => {});

  const storedRole = localStorage.getItem('role');
  if (storedRole !== 'admin') {
    return <Navigate to='/unauthorized' />;
  }
  return (
    <div className='flex pt-20 justify-center'>
      <div className='w-full flex justify-center flex-col p-8'>
        <h1>Users</h1>
        <table className='borders'>
          <thead>
            <tr className=''>
              <th className='borders'>User Names</th>
              <th className='borders'>Email</th>
              <th className='borders'>Role</th>
              <th className='borders'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className=''>
              <td className='borders'>Alhadji oumate</td>
              <td className='borders'>oumate@gmail.com</td>
              <td className='borders'>Student</td>
              <td className='flex gap-2'>
                <button>delete</button>
                <button>update</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
