
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; 

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./components/Calendar";

const clientId = "479503856810-5c5e8595ck4pcbqltdirksj3n7da4rft.apps.googleusercontent.com"; 

function App() {
  const { user } = useAuthContext(); 

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/Home" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

