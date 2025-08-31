import Lottie from "lottie-react";
import { useRecoilValue } from "recoil";
import { loadingState } from "../../atom/recoil.atom";
import billi from "./billi.json";

export default function LoadingScreen() {
    const loading = useRecoilValue(loadingState);
    if (!loading) return null;

    return (
    <div className="fixed inset-0   bg-neutral-700/30 flex items-center justify-center m z-50">
      <div className="relative  ">
        <Lottie 
          animationData={billi}
          loop={true} 
          className="w-32 h-32" 
        />
      
      </div>
    </div>
  );
}