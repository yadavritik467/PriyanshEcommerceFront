import React, { useEffect, useState } from 'react'
import "../admin.css"
import AdminNavbar from '../navbar/AdminNavbar'
import { Link } from 'react-router-dom'
import { server } from '../../../context/Reducer'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState("");

  const getAllUsers = async () => {
    try {
   
      const { data } = await axios.get(`${server}/allUsers`);
  
      if (data) {
        setUsers(data.users);
      }
 
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
   
    }
  };

  const onlineOrder = order.filter((o) => {
    if(o.paymentMethod === "Online"){
      return o;
    }
  })
  const CODOrder = order.filter((o) => {
    if(o.paymentMethod === "COD"){
      return o;
    }
  })
  const cancleOrder = order.filter((o) => {
    if(o.orderStatus === "cancle"){
      return o;
    }
  })
  const deliveredOrder = order.filter((o) => {
    if(o.orderStatus === "delivered"){
      return o;
    }
  })

  const AllOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/allOrders`);
      // console.log(data);
      setOrder(data.order);
      setTotal(data.totalRevenu);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllOrders();
    getAllUsers();
  }, []);

  return (
    <div>
      <AdminNavbar/>
      <div className='adminDashboard'>
        <Link className="box" to={"/admin/totalOrders"} >
          <p>Total revenue <br />  <br /> <span style={{fontSize:"1.4rem"}}> Rs. {total}/- </span></p>
        </Link>
        <Link to={"/admin/users"} className="box">
          <p>Total Users <br /> <span style={{fontSize:"1.9rem"}}>{users.length}</span></p>
        </Link>
        <Link className="box" to={"/admin/totalOrders"}>
          <p>Total order <br /> <span style={{fontSize:"1.9rem"}}>{order.length}</span> </p>
        </Link>
        <Link className="box" to={"/admin/onlineOrders"}>
          <p>Total online order <br /> <span style={{fontSize:"1.9rem"}}>{onlineOrder.length}</span> </p>
        </Link>
        <Link className="box" to={"/admin/CODOrders"} >
          <p>Total COD order  <br /> <span style={{fontSize:"1.9rem"}}>{CODOrder.length}</span></p>
        </Link>
        <Link className="box" to={"/admin/deliveredOrders"} >
          <p>Delivered order  <br /> <span style={{fontSize:"1.9rem"}}>{deliveredOrder.length}</span> </p>
        </Link>
        <Link className="box" to={"/admin/cancleOrders"} >
          <p>Cancel order  <br /> <span style={{fontSize:"1.9rem"}}>{cancleOrder.length}</span> </p>
        </Link>

      </div>
    </div>
  )
}

export default Dashboard
