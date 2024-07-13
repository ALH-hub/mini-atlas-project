import { useEffect, useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { baseRoute } from '../../../config.js';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const resp = await axios.get(`${baseRoute}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(resp.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (_id, role) => {
    try {
      await axios.delete(`${baseRoute}/users/${role}/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate(0);
    } catch (error) {
      console.error(error);
    }
  };

  const storedRole = localStorage.getItem('role');
  if (storedRole !== 'admin') {
    return <Navigate to='/unauthorized' />;
  }
  return (
    <div className='flex pt-20 justify-center mb-12'>
      <div className='w-full flex justify-center flex-col px-12'>
        <h1 className='font-bold text-center text-3xl mb-4'>Users</h1>
        <table className='w-full '>
          <thead className='borders'>
            <tr>
              <th className='borders'>Name</th>
              <th className='borders'>Email</th>
              <th className='borders'>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className='borders'>{user.name}</td>
                <td className='borders'>{user.email}</td>
                <td className='borders'>{user.role}</td>
                <td className='flex gap-4 borders justify-center'>
                  <Link to='/admin/update' state={user}>
                    <button className='pointer-cursor bg-blue-500 text-white p-1 rounded h-fit w-fit'>
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(user._id, user.role);
                    }}
                    className='pointer-cursor bg-red-500 text-white p-1 rounded h-fit w-fit'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
