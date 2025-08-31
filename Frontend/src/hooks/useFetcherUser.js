import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../atom/recoil.auth";
import axiosInstance from "../lib/axiosInstance";

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("/api/user/me/dash", {
        withCredentials: true, // 👈 cookie bhejne ke liye
      });

      if (res.status === 200 && res.data.success && res.data.data) {
        setAuth({
          isAuthenticated: true,
          user: res.data.data,
          loading: false, // 👈 abhi complete
        });
      } else {
        setAuth({ isAuthenticated: false, user: null, loading: false });
      }
    } catch (error) {
      setAuth({ isAuthenticated: false, user: null, loading: false });
    }
  };

  fetchUser();
}, [setAuth]);

  return auth;
};
