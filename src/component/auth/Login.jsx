import React, { useEffect, useState } from "react";
import {FcGoogle} from "react-icons/fc"
// import {GoogleLogin} from "react-google-login"
import "./auth.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../context/Reducer";
import { useAuth } from "../../context/auth";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
import {motion} from "framer-motion"
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
        localStorage.setItem("userID", JSON.stringify(response.data));

    
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
  

  // const googleSuccess = async(res) =>{
  
  //   const data = {
  //     user: res?.profileObj ?? {},
  //     token: res?.tokenId ?? ""
  //   };

  //   setAuth({
  //     ...auth,
  //     user: data.user,
  //     token: data.token
  //   }); 
  //     toast.success("login")
  //     localStorage.setItem("userID", JSON.stringify(data));

  
  //   navigate(location.state || "/");

  //   console.log(res);
    
  // }
  // const googleFailure = (error) =>{
  //    console.log(error);
  // }
  
 


  return (
    <div style={{display:"flex",flexDirection:"column"}} className="auth">
    
       <motion.form initial={{
            y: "-100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
          }} onSubmit={loginHandler}>

        <motion.h3 initial={{
            x: "-100%",
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}>Login</motion.h3>
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
        {/* <GoogleLogin 
        clientId="659252251104-ahf20a559sph3a6864c7blc3lgsj0061.apps.googleusercontent.com"
        render={(renderProps)=>(
          <button onClick={renderProps.onClick} >Login with <FcGoogle style={{fontSize:"25px"}}/></button> 
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy="single_host_origin"
        /> */}

        
       {/* <button onClick={googleHandler} >Login with <FcGoogle style={{fontSize:"25px"}}/></button> */}
      </motion.form> <br />
      <Link to={"/forgotPassword"} > Forgot Password </Link>
        <p>
          {" "}
          Create your Account <Link to={"/signUp"}> sign Up </Link>
        </p>
    </div>
  );
};

export default Login;
