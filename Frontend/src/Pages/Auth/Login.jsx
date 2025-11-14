import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { loadingState } from '../../atom/recoil.atom'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../lib/axiosInstance'
import toast from 'react-hot-toast'
import { authState } from '../../atom/recoil.auth'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const [auth , isauth] = useRecoilState(authState);
  const navigate = useNavigate()
const handleLogin = async () => {
  if (!email || !password) {
    toast.error("Please Fill All Fields");
    return;
  }

  setIsLoading(true);

  try {
    const res = await axiosInstance.post("api/auth/login", { email, password });


    if (res.status === 200 && res.data.user) {
      const user = res.data.user;
      toast.success(res.data.message || "Login Successful");
      isauth({isAuthenticated: true , user});

      console.log(user);
      if(user.role == "DOCTOR") navigate("/doctor-dashboard");
      if(user.role == "PATIENT") navigate("/patient-dashboard"); 

    } else {
      toast.error(res.data.message || "There is some error");
    }
  } catch (error) {
    console.error("Login error:", error);
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Login failed. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className='flex items-center justify-center min-h-screen w-full px-4 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden'>
      {/* Blue glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl top-0 left-1/4"></div>
        <div className="absolute w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl bottom-0 right-1/4"></div>
      </div>

      <div className="border-2 border-blue-900/50 rounded-lg p-6 sm:p-10 w-full max-w-[480px] backdrop-blur-md bg-black/70 shadow-2xl shadow-blue-900/20 relative z-10">
        <h1 className='text-2xl sm:text-3xl text-center font-bold tracking-wide mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>Login</h1>

        <div className='flex flex-col gap-6 w-full'>
          <div className='flex flex-col gap-3'>
            <label className='text-sm font-semibold text-gray-300'>Email Address</label>
            <Input
              className="w-full bg-gray-900/50 border-2 border-blue-900/50 focus:border-blue-500 rounded-md h-12 text-white font-medium placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
            />
          </div>
          <div className='flex flex-col gap-3'>
            <label className='text-sm font-semibold text-gray-300'>Password</label>
            <Input
              className="w-full bg-gray-900/50 border-2 border-blue-900/50 focus:border-blue-500 rounded-md h-12 text-white font-medium placeholder:text-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
            />
          </div>
        </div>

        <div className='mt-8 w-full'>
          <Button 
            onClick={handleLogin} 
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-md h-12 font-bold text-base tracking-wide transition-all duration-300 shadow-lg shadow-blue-600/30"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "LOGIN"}
          </Button>
        </div>

        <div className='flex flex-wrap justify-center mt-6 gap-1 text-sm font-medium text-gray-400'>
          <span>Don't have an account?</span>
          <span className='text-blue-400 hover:text-blue-300 cursor-pointer transition-colors font-semibold' onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
