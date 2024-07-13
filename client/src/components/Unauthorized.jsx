import unauthorized from '/401.png';

const Unauthorized = () => {
  return (
    <div className='flex flex-col gap-2 justify-center w-full items-center h-screen'>
      <img className='w-2/3' src={unauthorized} alt='401 Unauthorized' />
      <h1 className='text-red-700 mt-4 text-6xl font-bold'>
        Error 401: Unauthorized
      </h1>
      <p className='text-2xl'>You are not authorized to access this page.</p>
    </div>
  );
};

export default Unauthorized;
