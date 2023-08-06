import React, { useState } from 'react'
import "./ForgotPassword.css"
import axios from 'axios';
import { server } from '../../context/Reducer';
import { toast } from 'react-hot-toast';


const ForgotPassword = () => {

    const [email,setEmail] = useState("");

    const forgotPasswordHandler = async(e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${server}/forgotPassword`,{
                email
            })
          if(data){
            toast.success(data.message)
          }
        //   console.log(data)
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className='forgotPassword'>
      <form onSubmit={forgotPasswordHandler} >
        <input type="text" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} /> <br /> <br />
        <button type='submit'>send link</button>
      </form>
    </div>
  )
}

export default ForgotPassword
