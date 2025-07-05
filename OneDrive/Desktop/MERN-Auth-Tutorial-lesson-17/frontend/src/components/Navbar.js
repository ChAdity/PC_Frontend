import { Link } from 'react-router-dom'
//import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const { logout } = useLogout()
//  // const { user } = useAuthContext()

//   const handleClick = () => {
//     logout()
//   }

const Navbar = () => {
  const {  dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout(); // Log out from Google
    localStorage.removeItem("user"); // Remove user from localStorage
    dispatch({ type: "LOGOUT" }); // Update global state

    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Welcome To Your Placement Calendar</h1>
        </Link>

        {/* <li><Link to="/calendar">C</Link></li>  */}

        <nav>
          {/* {user && ( */}
            <div>
              {/* <span>{user.email}</span> */}
              <button onClick={handleLogout}>Log out</button>
            </div>
          {/* )} */}
          {/* {!user && (
            <div>
              <Link to="/login" >Login</Link>
              <Link to="/signup" >Signup</Link>
            </div>
          )} */}
        </nav>
      </div>
    </header>

   
  )
}

export default Navbar



