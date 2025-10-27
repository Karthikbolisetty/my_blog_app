// import React,{useState} from "react";
// import "./Auth.css"

// export default function Auth(){
//     const [registername,setregistername]=useState("");
//     const[registeremail,setregisteremail]=useState("");
//     const[registerpassword,setregisterpassword]=useState("");

//     const[loginemail,setloginemail]=useState("");
//     const[loginpassword,setloginpassword]=useState("");
//     const [message,setmessage]=useState("");
//     const handlerRegister=async(event)=>{
//         event.preventDefault();
//         try{
//             const response=await fetch('http://localhost:3001/api/auth/register',{
//                 method:"POST",
//                 headers:{'Content-Type':'application/json'},
//                 body:JSON.stringify({name:registername,email:registeremail,password:registerpassword})

//             })
//             const result = await response.json();
// console.log("Register Response:", result);

// if (response.ok && result.success) {
//   setmessage(result.message || "Registered successfully!");
// } else {
//   setmessage(result.message || "Registration failed. Please try again.");
// }

//         }
//         catch(error){
// setmessage("An error occured during registration")
//         }
//     }
//    const handleLogin = async (event) => {
//   event.preventDefault();
//   try {
//     const response = await fetch("http://localhost:3001/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email: loginemail, password: loginpassword }),
//     });

//     const result = await response.json();
//     console.log("Login Response:", result);

//     if (response.ok && result.success) {
//       setmessage(result.message || "Login successful!");
//       localStorage.setItem("token", result.token);

     
//       setloginemail("");
//       setloginpassword("");
//     } else {
//       setmessage(result.message || "Invalid email or password");
//     }
//   } catch (error) {
//     setmessage("An error occurred during login");
//   }
// };

    


//     return(
//         <div className="auth-body">
//         <div className="authcontainer">
//             <div className="form-section authform">
// <h2>registration</h2>
// <form onSubmit={handlerRegister}>
//     <input type="text" placeholder="name" value={registername} onChange={(e)=>setregistername(e.target.value)} required />
//     <input type="email" placeholder="email address" value={registeremail} onChange={(e)=>setregisteremail(e.target.value)} required />
//     <input type="password" placeholder="password" value={registerpassword} onChange={(e)=>setregisterpassword(e.target.value)} required />
//     {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
//     <button type="submit">Register</button>
// </form>
//             </div>
//             <div className="form-section authform">
// <h2>login</h2>
// <form onSubmit={handleLogin}> 
//     <input type="email" placeholder="emailaddress" value={loginemail} onChange={(e)=>setloginemail(e.target.value)} required />
// <input type="password" placeholder="password" value={loginpassword} onChange={(e)=>setloginpassword(e.target.value)} required />
// <button type="submit">login</button></form>
//             </div>
//         </div></div>
//     )
// }

import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [registername, setregistername] = useState("");
  const [registeremail, setregisteremail] = useState("");
  const [registerpassword, setregisterpassword] = useState("");

  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  const [message, setmessage] = useState("");
  const [success, setSuccess] = useState(false); 
  
const navigate=useNavigate();
  const handlerRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registername,
          email: registeremail,
          password: registerpassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setmessage(result.message || "Registered successfully!");
        setSuccess(true);
        setregistername("");
        setregisteremail("");
        setregisterpassword("");
        localStorage.setItem("token", result.token);
      } else {
        setmessage(result.message || "Registration failed. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      setmessage("An error occurred during registration");
      setSuccess(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginemail,
          password: loginpassword,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setmessage(result.message || "Login successful!");
        setSuccess(true);

       
        setloginemail("");
        setloginpassword("");

        localStorage.setItem("token", result.token);
        navigate("/")
      } else {
        setmessage(result.message || "Invalid email or password");
        setSuccess(false);
      }
    } catch (error) {
      setmessage("An error occurred during login");
      setSuccess(false);
    }
  };

  return (
    <div className="auth-body">
      <div className="authcontainer">
        <div className="form-section authform">
          <h2>Registration</h2>
          <form onSubmit={handlerRegister}>
            <input
              type="text"
              placeholder="Name"
              value={registername}
              onChange={(e) => setregistername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email address"
              value={registeremail}
              onChange={(e) => setregisteremail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={registerpassword}
              onChange={(e) => setregisterpassword(e.target.value)}
              required
            />
            <button type="submit">Register</button>
          </form>

         
          {message && <p style={{ color: success ? "neon" : "red", marginTop: "10px" }}>{message}</p>}
        </div>

        <div className="form-section authform">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={loginemail}
              onChange={(e) => setloginemail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginpassword}
              onChange={(e) => setloginpassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

         
          {message && <p style={{ color: success ? "neon" : "red", marginTop: "10px" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
