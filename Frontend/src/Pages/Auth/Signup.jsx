import React, { useEffect, useState } from 'react'
import {Input} from "../../components/ui/input"
import {Button} from "../../components/ui/button"
import toast from 'react-hot-toast'
import { loadingState } from '../../atom/recoil.atom'
import { useRecoilState } from 'recoil'
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
 } from "../../components/ui/select"
 import axiosInstance from '../../lib/axiosInstance'
import { useNavigate } from 'react-router-dom'


function SignUp() {

  
  const[name , setname] = useState("");
  const[email , setemail] = useState("");
  const[password , setpassword] = useState("");
  const[role , setrole] = useState("")

   const[loading , setLoading] = useRecoilState(loadingState);

 
  const navigate = useNavigate();

  const body = {
   name ,
   email,
   password,
   role
  }

  
const handleSignUp = async () => {
  
  if (!name || !email || !password || !role) {
    toast.error("Please fill all fields");
    return;
  }

  setLoading(true);

  try {
    const res = await axiosInstance.post("api/auth/register", { name, email, password, role });


    if (res.data) {
      toast.success(res.data.message || "Signup successful!");
      navigate("/login");
    } else {
      toast.error(res.data.message || "Signup failed");
    }
  } catch (error) {
  
    console.error("Signup error:", error);
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Signup failed. Please try again.");
    }
  } finally {
   
    setLoading(false);
  }
};

  return (
 <div className='flex items-center justify-center min-h-screen w-full px-4 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden'>
      {/* Blue glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-0 right-1/4"></div>
        <div className="absolute w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl bottom-0 left-1/4"></div>
      </div>

<div className="border-2 border-blue-900/50 rounded-lg p-6 sm:p-10 w-full max-w-[480px] backdrop-blur-md bg-black/70 shadow-2xl shadow-blue-900/20 relative z-10">
    <div>
      <h1 className='text-2xl sm:text-3xl text-center font-bold tracking-wide mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Sign Up</h1>
    </div>
    <div className='flex flex-col gap-6 w-full'>
       <div className='flex flex-col gap-3'>
         <label className='text-sm font-semibold text-gray-300'>Full Name</label>
         <Input className="w-full bg-gray-900/50 border-2 border-blue-900/50 focus:border-blue-500 rounded-md h-12 text-white font-medium placeholder:text-gray-500" value={name} onChange={(e) => setname(e.target.value)} placeholder="Enter your name" type="text" />
       </div>
       <div className='flex flex-col gap-3'>
         <label className='text-sm font-semibold text-gray-300'>Email Address</label>
         <Input className="w-full bg-gray-900/50 border-2 border-blue-900/50 focus:border-blue-500 rounded-md h-12 text-white font-medium placeholder:text-gray-500" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Enter your email" type="text" />
       </div>
       <div className='flex flex-col gap-3'>
         <label className='text-sm font-semibold text-gray-300'>Password</label>
         <Input className="w-full bg-gray-900/50 border-2 border-blue-900/50 focus:border-blue-500 rounded-md h-12 text-white font-medium placeholder:text-gray-500" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Enter your password" />
       </div>
       <div className='flex flex-col gap-3'>
         <label className='text-sm font-semibold text-gray-300'>Select Your Role</label>
        <Select value={role} onValueChange={setrole}>
        <SelectTrigger className="w-full bg-gray-900/50 border-2 border-blue-900/50 focus:border-blue-500 rounded-md h-12 text-white font-medium">
          <SelectValue placeholder="Choose your role" className="text-gray-500" />
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border-2 border-blue-900/50 text-white font-medium">
          <SelectItem value="DOCTOR" className="hover:bg-blue-600/20 cursor-pointer">Doctor</SelectItem>
          <SelectItem value="PATIENT" className="hover:bg-blue-600/20 cursor-pointer">Patient</SelectItem>
        </SelectContent>
      </Select>
       </div>
    </div>

    <div className='mt-8 w-full'>
      <Button 
        onClick={handleSignUp} 
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-md h-12 font-bold text-base tracking-wide transition-all duration-300 shadow-lg shadow-blue-600/30"
        disabled={loading}
      >
        {loading ? "Loading..." : "SIGN UP"}
      </Button>
    </div>

    <div className='flex flex-wrap justify-center mt-6 gap-1 text-sm font-medium text-gray-400'>
      <span>Already have an account?</span>
      <span className='text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-semibold' onClick={()=>{navigate("/login")}}>
        Login
      </span>
    </div>
   
  </div>
</div>

  )
}

export default SignUp