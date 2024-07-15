import { useState } from 'react';

function RegisterUsers() {
  const [users, setUsers] = useState({});

  const handleChange = (event, index, field) => {
    const { value } = event.target;
    setUsers((prevUsers) => ({
      ...prevUsers,
      [index]: {
        ...(prevUsers[index] || {}),
        [field]: value,
      },
    }));
  };

  const addAnotherUser = () => {
    const newIndex = Object.keys(users).length;
    setUsers((prevUsers) => ({
      ...prevUsers,
      [newIndex]: {},
    }));
  };

  return (
    <div className='pt-20'>
      {Object.entries(users).map(([index, userData], i) => (
        <div key={i}>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={userData.name || ''}
            onChange={(e) => handleChange(e, index, 'name')}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userData.email || ''}
            onChange={(e) => handleChange(e, index, 'email')}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userData.password || ''}
            onChange={(e) => handleChange(e, index, 'password')}
          />
        </div>
      ))}
      <button onClick={addAnotherUser}>Add User</button>
      {console.log(users)}
    </div>
  );
}

export default RegisterUsers;
