import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user data and set authentication state on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    const fetchUser = async () => {
      if (storedToken) {
        try {
          const response = await axios.get(
            `http://localhost:3030/api/auth/${storedRole}/me`,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            },
          );
          console.log('this is the user from context', response.data);
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
