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
    <div className="w-full h-16 border-b items-center flex justify-between px-4 md:px-8">
        <div className="flex gap-2">
            <p className="text-lg md:text-2xl font-light">
              Clinix Sphere
            </p>
        </div>
       

        <div className="hidden sm:block">
           <p className="font-bold text-sm md:text-base text-center">
          How are you, {user?.name?.split(" ")[0] || "Guest"}?
        </p>
        </div>

      <Button 
        onClick={handlelogout} 
        className="hover:cursor-pointer px-4 md:px-10 border-1 border-neutral-400 text-sm md:text-base"
      >
         Log Out
      </Button>

    </div>
  )
}

export default Header