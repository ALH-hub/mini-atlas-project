import Login from './components/Login.jsx';
import Home from './pages/Home.jsx';
import Register from './components/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={BrowserRouter} />
    </div>
  );
};

export default App;
