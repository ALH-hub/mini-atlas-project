import { useLocation } from 'react-router-dom';
import user from '/user.png';

const Logout = () => {
  const state = useLocation().state;
  return (
    <div>
      <img src={user} alt='' />
      <p>{state?.name}</p>
      <p>{state?.email}</p>
      <p>{state?.role}</p>
      <button>Logout</button>
    </div>
  );
};

export default Logout;
