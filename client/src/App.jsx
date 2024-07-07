import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TeacherHome from './pages/teacher/TeacherHome.jsx';
import StudentHome from './pages/student/StudentHome.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';

const BrowserRouter = createBrowserRouter([
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
    element: <StudentHome />,
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
