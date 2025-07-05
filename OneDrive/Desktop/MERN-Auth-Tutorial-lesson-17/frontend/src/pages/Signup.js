import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    // <form className="signup" onSubmit={handleSubmit}>
    //   <h3>Sign Up</h3>
      
    //   <label>Email address:</label>
    //   <input 
    //     type="email" 
    //     onChange={(e) => setEmail(e.target.value)} 
    //     value={email} 
    //   />
    //   <label>Password:</label>
    //   <input 
    //     type="password" 
    //     onChange={(e) => setPassword(e.target.value)} 
    //     value={password} 
    //   />

    //   <button disabled={isLoading}>Sign up</button>
    //   {error && <div className="error">{error}</div>}
    // </form>

    <div className="container">
    <div className="left-section">
      <div className="profile"></div>
      <div className="title">Welcome</div>
      <div className="title">"Navigate.. Apply. Achieve!"</div>

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
        <button className="login-btn" disabled={isLoading}>Sign Up</button>
        
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  </div>
  
  )
}

export default Signup