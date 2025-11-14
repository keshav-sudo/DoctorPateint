import { authState } from "../../../atom/recoil.auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "../../../components/ui/button";
import axiosInstance from "../../../lib/axiosInstance";
import { loadingState } from "../../../atom/recoil.atom";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast"


function Header() {
    
  const navigate = useNavigate();
    const[auth , isauth] =  useRecoilState(authState);
    const[mainloading , setmainloading] = useRecoilState(loadingState);
    const {user} = useRecoilValue(authState);
    const handlelogout = async() => {
      setmainloading(true);
      try {
        const res = await axiosInstance.post("api/auth/logout");
        isauth({
          isAuthenticated : false,
          user : null,
          loading : false,
        });
        if(res.data){
          toast.success(res.data.message || "Logout SuccessFully");
           navigate("/login");
        }
        if(!res.data){
          toast.error("Internal Error");
        }
      } catch (error) {
        toast.error("Logout Failed", error);
      }finally{
        setmainloading(false);
      }

    };


  return (
    <div className="w-full h-16 border-b-2 border-blue-900/30 items-center flex justify-between px-4 md:px-8 bg-black/90 backdrop-blur-sm shadow-lg shadow-blue-900/10">
        <div className="flex gap-2">
            <p className="text-lg md:text-xl font-bold tracking-wider bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CLINIX SPHERE
            </p>
        </div>
       

        <div className="hidden sm:block">
           <p className="font-medium text-sm md:text-base text-gray-300">
          Welcome, <span className="text-blue-400 font-bold">{user?.name?.split(" ")[0] || "Guest"}</span>
        </p>
        </div>

      <Button 
        onClick={handlelogout} 
        className="px-4 md:px-6 py-2 bg-transparent border-2 border-blue-900/50 hover:border-blue-500 rounded-md text-sm md:text-base font-semibold hover:bg-blue-600/10 transition-all duration-300"
      >
         LOGOUT
      </Button>

    </div>
  )
}

export default Header