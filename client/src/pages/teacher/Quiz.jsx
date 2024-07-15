import { useState } from 'react';

function RegisterUsers() {
  const [users, setUsers] = useState({}); // Object to store user data

  const handleChange = (event, index, field) => {
    const { value } = event.target;
    setUsers((prevUsers) => ({
      ...prevUsers,
      [index]: {
        ...(prevUsers[index] || {}), // Ensure object exists at index
        [field]: value,
      },
    }));
  };

  const addAnotherUser = () => {
    const newIndex = Object.keys(users).length; // Get next available index
    setUsers((prevUsers) => ({
      ...prevUsers,
      [newIndex]: {}, // Add an empty object for the new user
    }));
  };

  return (
    <div>
      {Object.entries(users).map(([index, userData], i) => (
        <div key={i}>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={userData.name || ''} // Set initial value if available
            onChange={(e) => handleChange(e, index, 'name')}
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userData.email || ''} // Set initial value if available
            onChange={(e) => handleChange(e, index, 'email')}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userData.password || ''} // Set initial value if available
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
