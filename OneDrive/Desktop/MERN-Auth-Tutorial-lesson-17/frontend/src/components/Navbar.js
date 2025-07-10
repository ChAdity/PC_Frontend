import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const {  dispatch } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout(); 
    localStorage.removeItem("user"); 
    dispatch({ type: "LOGOUT" }); 
    navigate("/login"); 
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Welcome To Your Placement Calendar</h1>
        </Link>

        <nav>
         
            <div> 
              <button onClick={handleLogout}>Log out</button>
            </div>
         
        </nav>
      </div>
    </header>

   
  )
}

export default Navbar



