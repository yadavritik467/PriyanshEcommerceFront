import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { useAuth } from "../../context/auth";
import { server } from "../../context/Reducer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import Cookies from "js-cookie";

const MyProfile = () => {
  const [load, setLoad] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [user, setUser] = useState([]);
  const [id, setId] = useState("");
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  const navigate = useNavigate();


 const openModal = (_id) =>{
    setUpdateModal(true);
    setId(_id)
 }

 const updateHandler = async() =>{
    try {
        setLoad(true);
        const {data} = await axios.put(`${server}/users/${id}`,{
            name,number,email,address
        })
        setName("");setNumber("");setEmail("");setAddress("");
        getAllUsers();
        setLoad(false);
        toast.success("profile updated")
    } catch (error) {
        console.error(error);
      toast.error("server error please wait or refresh");
      setLoad(false);
    }
 }

  const getAllUsers = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(`${server}/allUsers`);
      //   console.log(data);
      if (data) {
        setUser(data.users);
      }
      setLoad(false);
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
      setLoad(false);
    }
  };

  const deleteMyProfile = async (_id) => {
    try {
      await axios.delete(`${server}/users/${_id}`);

      await setAuth({
        ...auth,
        user: null,
        token: "",
      });
      Cookies.remove("token");
      toast.success("your Account has been deleted successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div style={{width:"100%",height:"80vh"}}>
      {user.map((u) => {
        if (u._id === auth.user._id) {
          return (
            <div key={u._id} className="profile">
              {load === true ? (
                <Loader />
              ) : (
                <div>
                  <p>
                    Name: <b>{u.name}</b>
                  </p>
                  <p>
                    Email: <b>{u.email}</b>
                  </p>
                  <p>
                    Number: <b>{u.number}</b>
                  </p>
                  <p>
                    Address: <b>{u.address}</b>
                  </p>
                  <button onClick={() => openModal(u._id)}>
                    Update Details
                  </button>{" "}
                  <br /> <br />
                  {updateModal === true && (
                    <div className="profile_1">
                      <div>
                      <input required type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" />
        <input required type="number" value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Enter your number" />
        <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
        <input required type="text"value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="Enter your address" />
                        <button onClick={updateHandler}> update</button>
                        <button onClick={() => setUpdateModal(false)}>
                          {" "}
                          cancle
                        </button>
                      </div>
                    </div>
                  )}
                  <button onClick={() => deleteMyProfile(u._id)}>
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default MyProfile;
