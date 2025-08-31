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
    <div className="w-full h-16 border-b items-center flex justify-between ">
        <div className="flex gap-2 ">
            <p className="text-2xl font-light ml-20 ">
              Clinix Shepre
            </p>
             {/* <p className="text-2xl">
              {user?.name }
             </p>
             <h2 className="">
              {user?.role === "DOCTOR" ? "🩺" : "🛌" }
             </h2>
             */}

          
        </div>
       

        <div>
           <p className="ml-30 font-bold">
          How are you, {user?.name?.split(" ")[0] || "Guest" } ?

        </p>
          
        </div>
      <Button 
        onClick={handlelogout} 
         className="hover:cursor-pointer px-10 border-1 border-neutral-400 ml-150"
               >
         Log Out
      </Button>


        <div>

        </div>

    </div>
  )
}

export default Header