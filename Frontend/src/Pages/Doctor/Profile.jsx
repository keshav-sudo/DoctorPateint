import React from 'react'
import { authState } from '../../atom/recoil.auth'
import { useRecoilValue } from 'recoil'

function Profile() {
  const {user} = useRecoilValue(authState);
  return (
    <div className='w-full h-full flex justify-center items-center p-4'>
      <div className='rounded-2xl border border-neutral-500 max-w-[600px] w-full min-h-[400px] md:h-[600px]'>
        <div className='border-b h-12 md:h-15 flex justify-center items-center text-center text-xl md:text-2xl'>
          <h1>Hey {user?.name.split(" ")[0]}!</h1> 
        </div>

        <div>
          <div className='flex flex-col justify-center items-center'>
            <div className="rounded-full overflow-hidden bg-amber-50 h-24 w-24 md:h-30 md:w-30 mt-6 md:mt-10">
              <img className='object-contain w-full h-full' src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`} alt="" />
            </div>
            <div className='mt-6 md:mt-10 w-full text-center text-lg md:text-2xl flex flex-col gap-2 px-4'>
              <div className='text-center w-full border p-2 mb-3 md:mb-5'>
                Details
              </div>
              <h1 className="break-words">Name: {user?.name}</h1>
              <h1>Role: {user?.role}</h1>
              <h1 className="break-words">Email: {user?.email}</h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile