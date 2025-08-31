
import { CgProfile } from "react-icons/cg";
import { FaUserDoctor } from "react-icons/fa6";
import { Navigate, useNavigate } from 'react-router-dom';
import { GoHomeFill, GoPaperclip } from "react-icons/go";
import { FaPaperclip } from "react-icons/fa6";

function SideBarforPat() {
    const navigate = useNavigate();

    
  return (

   <div className='h-full flex justify-center items-start'>
  <div className='mt-40 mx-10 w-full'>
    <div className='flex flex-col gap-4'>
      <div  onClick={()=>{navigate("/patient-dashboard/")}} className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded-md p-2'>
        <GoHomeFill color='white'  size={20} />
        <h1 className='text-white'>DashBoard</h1>
         </div>

      <div  onClick={()=>{navigate("/patient-dashboard/profile")}} className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded-md p-2'>
        <CgProfile color='white'  size={20} />
        <h1 className='text-white'>Profile</h1>
         </div>
         <div  onClick={()=>{navigate("/patient-dashboard/appointment-pateint")}}  className='flex items-center gap-2 cursor-pointer hover:bg-gray-700 rounded-md p-2'>
          <FaUserDoctor color='white'  size={20}/>
          <h1 className='text-white'>Appointments</h1>
         </div>
         

      </div>
     </div>
  </div>

  )
}

export default SideBarforPat