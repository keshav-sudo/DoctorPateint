import React from 'react';
import { useAuth } from '../context/context'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className='bg-amber-200 h-screen max-w-screen flex justify-center items-center'>
      <div className='bg-white h-auto w-[90%] md:w-[60%] lg:w-[40%] rounded-2xl p-6 shadow-lg'>
        <div className='Header border-b-2 border-amber-200 pb-4 text-center'>
          <h1 className='text-3xl font-bold text-gray-800'>User Profile</h1>
          <p className='text-gray-500 mt-1'>View and manage your account details.</p>
        </div>

        <div className='Details mt-6 space-y-4'>
          <div className='flex items-center space-x-4'>
            <span className='font-semibold text-gray-700 w-24'>Name:</span>
            <span className='text-gray-600'>{user?.name || 'N/A'}</span>
          </div>

          <div className='flex items-center space-x-4'>
            <span className='font-semibold text-gray-700 w-24'>Email:</span>
            <span className='text-gray-600'>{user?.email || 'N/A'}</span>
          </div>
          
          <div className='flex items-center space-x-4'>
            <span className='font-semibold text-gray-700 w-24'>Role:</span>
            <span className='text-gray-600 capitalize'>{user?.role || 'N/A'}</span>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <button
            onClick={handleLogout}
            className='w-full py-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;