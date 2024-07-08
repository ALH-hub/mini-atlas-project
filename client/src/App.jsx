import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import TeacherHome from './pages/teacher/TeacherHome.jsx';
import StudentHome from './pages/student/StudentHome.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import SNavbar from './components/student/SNavbar.jsx';

const SLayout = () => {
  return (
    <>
      <SNavbar />
      <Outlet />
    </>
  );
};

const BrowserRouter = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminHome />,
  },
  {
    path: '/teacher',
    element: <TeacherHome />,
  },
  {
    path: '/student',
    element: <SLayout />,
    children: [
      {
        path: '/student',
        element: <StudentHome />,
      },
    ],
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
