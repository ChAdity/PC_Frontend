



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext"; // Import Auth Context
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext(); // Get auth state
  const navigate = useNavigate();

  // Redirect to calendar if already logged in
  useEffect(() => {
    if (user) {
      navigate("/calendar");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
 
  const handleGoogleLogin = () => {
    window.open("https://pc-backhend-2.onrender.com/auth/google?prompt=select_account", "_self"); // Forces Google sign-in prompt
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="profile"></div>
        <div className="title">Placement Calendar</div>
        <div className="title">"Navigate... Apply. Achieve!"</div>
      </div>
      <div className="right-section">
        <form className="login" onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Email address:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="input-box">
            <label>Password:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="login-btn" disabled={isLoading}>Log in</button>

          <button type="button" className="google-login-btn" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>

          <Link to="/signup">
            <button className="sign-btn" disabled={isLoading}>Sign Up</button>
          </Link>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;



