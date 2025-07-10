
import { useAuthContext } from "./useAuthContext";
import { googleLogout } from "@react-oauth/google"; 

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("user");

    googleLogout(); 

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
