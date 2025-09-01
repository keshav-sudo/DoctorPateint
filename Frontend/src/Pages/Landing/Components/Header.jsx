import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authState } from '../../../atom/recoil.auth';
import { useRecoilValue } from 'recoil';

function Header() {
       const {isAuthenticated , user}  = useRecoilValue(authState);
    const navigate = useNavigate();

  return (
    <header>
        <div className=' '>
          <div className='bg-black h-16 w-full flex justify-between items-center'>

            <div className=' ml-32 font-bold text-2xl'>
              Clinix Sphere
            </div>

            <div className="flex font-semibold gap-4">
              <button className=" text-2xl cursor-pointer " onClick={()=>{navigate("/doctor-dashboard")}}>Doctor</button>
              <button className=" text-2xl cursor-pointer" onClick={()=>{navigate("/patient-dashboard")}}>Pateint</button>
            </div>

            <div className='mr-32 font-semibold  '>
              {
                user?.name ? (
                 <h1>Hey! {user?.name}</h1>
                ) : 
                (
                  <div className="flex gap-4">
                     <button className="cursor-pointer  hover:text-gray-300 " onClick={()=>{navigate("/login")}}>Login</button>
                     <button className="cursor-pointer  hover:text-gray-300 " onClick={()=>{navigate("/signup")}}>Register</button>
                  </div>
                  )
              }
            </div>

          </div>

        </div>
    </header>
  )
}

export default Header