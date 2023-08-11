import React, { useEffect, useState } from "react";
import "../admin.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaUserSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../../../context/Reducer";
import Loader from "../../Loader/Loader";
import { useAuth } from "../../../context/auth";
const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);
  const [auth] = useAuth();

  const data = users;
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data.filter((item) =>
    item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAllUsers = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(`${server}/allUsers`);
      // console.log(data);
      if (data) {
        setUsers(data.users);
      }
      setLoad(false);
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
      setLoad(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (_id) => {
    try {
      
        await axios.delete(`${server}/users/${_id}`,{
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userID")).token,
          },
        });
        toast.success("User deleted");
        getAllUsers();
      
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
    }
  };

  return (
    <div>
      <div className="adminNavbar">
        <Link to={"/admin/dashboard"}>
          {" "}
          Dashboard <AiOutlineDashboard />
        </Link>
        <Link to={"/admin/users"}>
          Users
          <LiaUserSolid />
        </Link>
        <Link to={"/admin/products"}>
          Products <MdProductionQuantityLimits />{" "}
        </Link>
        <Link to={"/admin/front"}>
          Front Page <BsCardImage />{" "}
        </Link>
      </div>

      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        style={{ width: "90%", margin: "15px", textAlign: "center" }}
        placeholder="search user by email "
      />
      <div className="adminPanel">
        
         
          {load === true ? (
            <div style={{width:"100%",position:"fixed",height:"350px", display:"flex",justifyContent:"center",alignItems:"center"}}>

          <p style={{fontSize:"1.7rem",}}>Loading</p>
            </div>
          ) : (
            <>
            <table>
             <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>NUMBER</th>
              <th>Address</th>
              <th>ROLE</th>
            </tr>
          </thead>
              <tbody>
                {filteredData.map((u) => {
                  return (
                    <tr key={u._id}>
                      <td>{u._id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.number}</td>
                      <td>{u.address}</td>
                      <td>{u.role}</td>
                      <td>
                       {u.role === "user" &&  <button onClick={() => deleteUser(u._id)}>
                          delete
                        </button>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
        </table>
            </>
          )}
      </div>
    </div>
  );
};

export default AdminUsers;
