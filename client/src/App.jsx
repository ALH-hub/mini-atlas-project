import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import TeacherHome from './pages/teacher/TeacherHome.jsx';
import StudentHome from './pages/student/StudentHome.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
// import SNavbar from './components/student/SNavbar.jsx';
import Navbar from './components/Navbar.jsx';
import Write from './components/teacher/Write.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import TeacherNav from './components/teacher/TeacherNav.jsx';
import UpdateUser from './pages/admin/UpdateUser.jsx';
import CreateUser from './pages/admin/CreateUser.jsx';
import Quiz from './pages/teacher/Quiz.jsx';
import QuizUpload from './pages/teacher/QuizUpload.jsx';

const SLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const TLayout = () => {
  return (
    <>
      <TeacherNav />
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
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <SLayout />,
    children: [
      {
        path: '/admin',
        element: <AdminHome />,
      },
      {
        path: '/admin/update',
        element: <UpdateUser />,
      },
      {
        path: '/admin/create',
        element: <CreateUser />,
      },
    ],
  },

  {
    path: '/teacher',
    element: <TLayout />,
    children: [
      {
        path: '/teacher',
        element: <TeacherHome />,
      },
      {
        path: '/teacher/quiz',
        element: <Quiz />,
      },
      {
        path: '/teacher/quiz/new',
        element: <QuizUpload />,
      },
    ],
  },
  {
    path: '/write',
    element: <TLayout />,
    children: [
      {
        path: '/write',
        element: <Write />,
      },
    ],
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
    path: '/unauthorized',
    element: <Unauthorized />,
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
