import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authState } from '../../../atom/recoil.auth';
import { useRecoilValue } from 'recoil';
import { Menu, X } from 'lucide-react';

function Header() {
       const {isAuthenticated , user}  = useRecoilValue(authState);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
        <div className=' '>
          <div className='bg-black h-16 w-full flex justify-between items-center px-4 md:px-8 lg:px-32'>

            <div className='font-bold text-xl md:text-2xl'>
              Clinix Sphere
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex font-semibold gap-4">
              <button className="text-lg lg:text-2xl cursor-pointer hover:text-gray-300" onClick={()=>{navigate("/doctor-dashboard")}}>Doctor</button>
              <button className="text-lg lg:text-2xl cursor-pointer hover:text-gray-300" onClick={()=>{navigate("/patient-dashboard")}}>Patient</button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className='hidden md:block font-semibold'>
              {
                user?.name ? (
                 <h1 className="text-sm lg:text-base">Hey! {user?.name}</h1>
                ) : 
                (
                  <div className="flex gap-4">
                     <button className="cursor-pointer hover:text-gray-300 text-sm lg:text-base" onClick={()=>{navigate("/login")}}>Login</button>
                     <button className="cursor-pointer hover:text-gray-300 text-sm lg:text-base" onClick={()=>{navigate("/signup")}}>Register</button>
                  </div>
                  )
              }
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black border-t border-gray-700 py-4">
              <div className="flex flex-col items-center gap-4">
                <button 
                  className="text-lg cursor-pointer hover:text-gray-300" 
                  onClick={()=>{navigate("/doctor-dashboard"); setMobileMenuOpen(false);}}
                >
                  Doctor
                </button>
                <button 
                  className="text-lg cursor-pointer hover:text-gray-300" 
                  onClick={()=>{navigate("/patient-dashboard"); setMobileMenuOpen(false);}}
                >
                  Patient
                </button>
                {user?.name ? (
                  <h1 className="text-base">Hey! {user?.name}</h1>
                ) : (
                  <>
                    <button 
                      className="cursor-pointer hover:text-gray-300" 
                      onClick={()=>{navigate("/login"); setMobileMenuOpen(false);}}
                    >
                      Login
                    </button>
                    <button 
                      className="cursor-pointer hover:text-gray-300" 
                      onClick={()=>{navigate("/signup"); setMobileMenuOpen(false);}}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

        </div>
    </header>
  )
}

export default Header