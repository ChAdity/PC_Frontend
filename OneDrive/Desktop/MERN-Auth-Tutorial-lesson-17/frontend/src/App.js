
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { useAuthContext } from './hooks/useAuthContext'
// import { gapi } from "gapi-script";

// // pages & components
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
// //import Navbar from './components/Navbar'
// import Calendar from "./components/Calendar";

// function App() {
//   const { user } = useAuthContext()

//   return (
//     <div className="App">
//       <BrowserRouter>
//          {/* <Navbar />  */}
//         <div className="pages">
//           <Routes>
//             <Route 
//               path="/" 
//               element={user ? <Home /> : <Navigate to="/login" />} 
//             />
//             <Route 
//               path="/login" 
//               element={!user ? <Login /> : <Navigate to="/" />} 
//             />
//             <Route 
//               path="/signup" 
//               element={!user ? <Signup /> : <Navigate to="/" />} 
//             />
//             <Route path="/calendar" element={<Calendar />} />

//             <Route path="/Home" element={<Home />} />

//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useAuthContext } from "./hooks/useAuthContext";
// import { useEffect } from "react";
// import { gapi } from "gapi-script";

// // pages & components
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Calendar from "./components/Calendar";
// //import Navbar from "./components/Navbar"; 

// const clientId = "479503856810-5c5e8595ck4pcbqltdirksj3n7da4rft.apps.googleusercontent.com"; //  Replace with your actual Google Client ID

// function App() {
//   const { user } = useAuthContext();

//   useEffect(() => {
//     function start() {
//       gapi.load("auth2", () => {
//         gapi.auth2.init({ client_id: clientId });
//       });
//     }
//     start();
//   }, []);

//   return (
//     <div className="App">
//       <BrowserRouter>
       
//         <div className="pages">
//           <Routes>
//             <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
//             <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
//             <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="/Home" element={<Home />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import Google provider

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calendar from "./components/Calendar";
//import Navbar from "./components/Navbar";

const clientId = "479503856810-5c5e8595ck4pcbqltdirksj3n7da4rft.apps.googleusercontent.com"; // Replace with actual Client ID

function App() {
  const { user } = useAuthContext(); // Get user state

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <BrowserRouter>
           {/* Ensure Navbar is included */}
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

