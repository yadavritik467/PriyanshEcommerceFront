import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../context/Reducer";
import axios from "axios";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
const SignUp = () => {

    const [load, setLoad] = useState(false)
    const navigate = useNavigate();

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [address, setAddress] = useState("")

    const registerHandler = async(e)=>{
        e.preventDefault();
        if (password !== cpassword){
          toast.error("password mismatch")
          
        }
        else if(name.trim() === "" || email.trim() === "" || password.trim() === "" || cpassword.trim() === "" || address.trim() === "" ){
          toast.error("Empty values are not allowed")
         } 
        else{
           try {
            setLoad(true)
            const {data} = await axios.post(`${server}/register`,{
                 name,number,email,password,cpassword,address
            })
            setLoad(false);
            // console.log(data)
            if(data.existingUser){
              toast.error(data.message)
            }else {
              toast.success(data.message);
              setTimeout(()=>{
                navigate("/login")
              },1500)
            }
            
           } catch (error) {
            console.error(error)
            toast.error("Internal server error")
            setLoad(false);
           }
        }
    }
  return (
    <div className="auth">
      <form onSubmit={registerHandler}>
        <h3>Sign Up</h3>
        <input required type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" />
        <input required type="number" value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Enter your number" />
        <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
        <input required type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        <input required type="text" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} placeholder="Confirm password" />
        <input required type="text"value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter your address" />
        <button type="submit">{ load ? <Loader/> : "Sign Up"} </button>
        
        <p>
          {" "}
          Already account ? click <Link to={"/login"}> Login </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
