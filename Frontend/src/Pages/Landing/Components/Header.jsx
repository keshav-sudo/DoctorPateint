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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/90 border-b border-blue-900/30 shadow-lg shadow-blue-900/10">
        <div className=''>
          <div className='h-16 w-full flex justify-between items-center px-4 md:px-8 lg:px-32'>

            <div className='font-semibold text-xl md:text-2xl tracking-wider cursor-pointer hover:text-blue-400 transition-colors bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent' onClick={() => navigate('/')}>
              CLINIX SPHERE
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button className="text-sm lg:text-base font-medium cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-300" onClick={()=>{navigate("/doctor-dashboard")}}>
                Doctor
              </button>
              <button className="text-sm lg:text-base font-medium cursor-pointer text-gray-300 hover:text-blue-400 transition-all duration-300" onClick={()=>{navigate("/patient-dashboard")}}>
                Patient
              </button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className='hidden md:block'>
              {
                user?.name ? (
                 <h1 className="text-sm lg:text-base font-medium text-gray-300">Welcome, <span className="text-blue-400">{user?.name}</span></h1>
                ) : 
                (
                  <div className="flex gap-4">
                     <button className="cursor-pointer font-medium text-sm lg:text-base text-gray-300 hover:text-blue-400 transition-colors" onClick={()=>{navigate("/login")}}>Login</button>
                     <button className="cursor-pointer px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-md font-medium text-sm lg:text-base hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-blue-600/30" onClick={()=>{navigate("/signup")}}>Register</button>
                  </div>
                  )
              }
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-blue-900/30 py-6 px-4">
              <div className="flex flex-col items-center gap-6">
                <button 
                  className="text-base font-medium cursor-pointer text-gray-300 hover:text-blue-400 transition-colors" 
                  onClick={()=>{navigate("/doctor-dashboard"); setMobileMenuOpen(false);}}
                >
                  Doctor
                </button>
                <button 
                  className="text-base font-medium cursor-pointer text-gray-300 hover:text-blue-400 transition-colors" 
                  onClick={()=>{navigate("/patient-dashboard"); setMobileMenuOpen(false);}}
                >
                  Patient
                </button>
                {user?.name ? (
                  <h1 className="text-sm font-medium text-gray-300">Welcome, <span className="text-blue-400">{user?.name}</span></h1>
                ) : (
                  <>
                    <button 
                      className="cursor-pointer font-medium text-gray-300 hover:text-blue-400 transition-colors" 
                      onClick={()=>{navigate("/login"); setMobileMenuOpen(false);}}
                    >
                      Login
                    </button>
                    <button 
                      className="cursor-pointer px-8 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-md font-medium hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-lg shadow-blue-600/30" 
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