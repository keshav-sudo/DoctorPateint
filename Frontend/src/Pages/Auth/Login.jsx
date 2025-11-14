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
    <div className='flex items-center justify-center min-h-screen w-full px-4'>
      <div className="border-2 rounded-2xl p-4 sm:p-6 w-full max-w-[400px] min-w-[280px] h-auto max-h-[70vh] flex flex-col items-center justify-center mx-auto my-8">
        <h1 className='text-xl sm:text-2xl text-center'>Login With Email</h1>

        <div className='flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-10 w-full'>
          <Input
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <Input
            className="w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
        </div>

        <div className='mt-6 sm:mt-10 w-full'>
          <Button variant="outline" onClick={handleLogin} className="w-full bg-black text-white">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>

        <div className='flex flex-wrap justify-center mt-5 gap-1 sm:gap-2 text-sm sm:text-base'>
          <h1>Don't have an account?</h1>
          <span className='hover:underline cursor-pointer' onClick={() => navigate("/signup")}>
            SignUp
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
