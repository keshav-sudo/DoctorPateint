import React from 'react'
import { authState } from '../../atom/recoil.auth'
import { useRecoilValue } from 'recoil'

function Profile() {
  const {user} = useRecoilValue(authState);
  return (
    <div className= ' w-full h-full flex justify-center items-center'>
      <div className=' rounded-2xl border border-neutral-500 h-[600px] w-[600px]'>
        <div className='border-b h-15 flex justify-center items-center text-center text-2xl'>
          <h1>Hey {user?.name.split(" ")[0]}!</h1> 
        </div>

        <div >

        <div className='flex  flex-col justify-center items-center'>
          <div className="rounded-full  overflow-hidden  bg-amber-50  h-30 w-30 mt-10">
            <img className='object-contain w-full h-full'   src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`}  alt="" />
          </div>
          <div className='mt-10 w-full  text-center text-2xl flex flex-col gap-2'>
            <div className='text-center w-full border p-2 mb-5 '>
              Details
            </div >
            <h1> Name :  {user?.name}</h1>
            <h1> Role :  {user?.role}</h1>
            <h1> Email : {user?.email}</h1>
          </div>
        </div>
        </div>

      </div>


    </div>
  )
}

export default Profile