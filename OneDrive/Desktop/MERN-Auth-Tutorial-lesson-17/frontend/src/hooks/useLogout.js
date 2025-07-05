// import { useAuthContext } from './useAuthContext'

// export const useLogout = () => {
//   const { dispatch } = useAuthContext()

//   const logout = () => {
//     // remove user from storage
//     localStorage.removeItem('user')

//     // dispatch logout action
//     dispatch({ type: 'LOGOUT' })
//   }

//   return { logout }
// }


//import { useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { googleLogout } from "@react-oauth/google"; // Import Google logout function

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Remove user from local storage
    localStorage.removeItem("user");

    // Google logout
    googleLogout(); // This will sign out from Google OAuth

    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
