import React, { useState } from 'react'
import "./ForgotPassword"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../context/Reducer';
import { toast } from 'react-hot-toast';
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const params = useParams();
    console.log(params)

    const resetPasswordHandler =async(e) =>{
        e.preventDefault();
        try {
            const {data} = axios.put(`${server}/password/reset/${params.token}`,{
                newPassword
            })
            
                toast.success("password updated successfully");
            
        } catch (error) {
            console.log(error.message)
        }
    }


  return (
    <div className='forgotPassword'>
    <form onSubmit={resetPasswordHandler} >
      <input type="password" placeholder='Enter your new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} /> <br /> <br />
      <button type='submit'>reset password</button>
      <Link to={"/forgotPassword"} >Request another link</Link>
    </form>
  </div>
  )
}

export default ResetPassword
