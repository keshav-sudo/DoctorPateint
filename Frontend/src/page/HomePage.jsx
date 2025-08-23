import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/context';
import Appointments from './Appointments.';

function HomePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

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
    <div className='main bg-amber-200 min-h-screen flex flex-col items-center'>
      <div className='screen flex items-center justify-center min-w-screen'>
        <div className='navbar bg-white w-[90%] rounded-3xl h-18 absolute top-2 flex items-center px-4 justify-between'>
          {/* Left Side: Logo */}
          <div className='image h-[90%]'>
            <img className='max-w-full h-full object-contain' src="/Gemini_Generated_Image_px5envpx5envpx5e.png" alt="Clinix Sphere Logo" />
          </div>

        
          <div 
            className='profile h-[90%] w-12 cursor-pointer'
            onClick={handleProfileClick}
          >
            <img 
              className='rounded-full h-full object-cover' 
              src="/vecteezy_happy-doctor-character-sticker_17004256.jpg" 
              alt="Doctor Profile" 
            />
          </div>
        </div>
      </div>
  
      <div className='Hero w-[90%] mt-40'>
        <div className='flex flex-col items-center justify-center pt-24 text-center bg-amber-50 rounded-2xl p-8'>
          {user && (
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>
              Hello, {user.name}!
            </h1>
          )}
          <h1>Your Appointements Are</h1>
          <h1>
            <Appointments/>
          </h1>

    
        </div>
      </div>
    </div>
  );
}

export default HomePage;
