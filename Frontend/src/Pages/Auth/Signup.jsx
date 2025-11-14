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
 <div className='flex items-center justify-center min-h-screen w-full px-4'>
<div className="border-2 rounded-2xl p-4 sm:p-6 w-full max-w-[400px] min-w-[280px] h-auto max-h-[70vh] flex flex-col items-center justify-center mx-auto my-8">
    <div>
      <h1 className='text-xl sm:text-2xl text-center'>SignUp With Email</h1>
    </div>
    <div className='flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-10 w-full'>
       <Input className="w-full" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name" type="text" />
       <Input className="w-full" value={email} onChange={(e) => setemail(e.target.value)} placeholder="Email" type="text" />
       <Input className="w-full" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
        <Select value={role} onValueChange={setrole}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="DOCTOR">Doctor</SelectItem>
          <SelectItem value="PATIENT">Patient</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className='mt-6 sm:mt-10 w-full'>
      <Button variant="outline" onClick={handleSignUp} className="w-full bg-black">
        SignUp
      </Button>
    </div>

    <div className='flex flex-wrap justify-center mt-5 gap-1 text-sm sm:text-base'>
      <h1>You have an account?</h1>
      <span className='hover:underline cursor-pointer' onClick={()=>{navigate("/login")}}>
        Login
      </span>
    </div>
   
  </div>
</div>

  )
}

export default SignUp