import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
