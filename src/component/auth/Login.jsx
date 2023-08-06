import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../context/Reducer";
import { useAuth } from "../../context/auth";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [load, setLoad] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleGoogleLogin = async() =>{
     window.location.href = "http://localhost:4500/auth/google";
  }
  

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      
      const response =  await axios.post (`${server}/login`,{
        email,
        password
      })
      setLoad(false);
      // console.log(response);
     
      setAuth({
        ...auth,
        user:response.data.user,
        token:response.data.token,
      })  
        toast.success("login")
      Cookies.set("token", JSON.stringify(response.data));

    
      navigate(location.state || "/");
    } catch (error) {
      console.error(error)
      toast.error("invalid email or password");
      setLoad(false);
     setTimeout(()=>{
      navigate("/signUp");
     },1500)
    }
  };
  
 


  return (
    <div style={{display:"flex",flexDirection:"column"}} className="auth">
    
       <form onSubmit={loginHandler}>
        <h3>Login</h3>
        <input
          required
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          required
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit">{ load ? "Loading" : "Login"}</button>
        
       {/* <button onClick={googleHandler} >Login with <FcGoogle style={{fontSize:"25px"}}/></button> */}
      </form> <br />
      <Link to={"/forgotPassword"} > Forgot Password </Link>
        <p>
          {" "}
          Create your Account <Link to={"/signUp"}> sign Up </Link>
        </p>
    </div>
  );
};

export default Login;
