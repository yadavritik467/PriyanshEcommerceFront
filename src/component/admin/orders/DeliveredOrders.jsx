import React, { useEffect, useState } from "react";
// import "./MyOrder.css";

import axios from "axios";
import { useAuth } from "../../../context/auth";
import { server } from "../../../context/Reducer";
import { Link } from "react-router-dom";

const DeliveredOrder = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();

  const AllOrders = async () => {
    try {
      const { data } = await axios.get(`${server}/allOrders`);
    //   console.log(data);
      setOrder(data.order);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllOrders();
  }, []);
  return (
    <div className="MyOrder">
        <Link style={{color:"grey", position:"fixed", backgroundColor:"white"}} to={"/admin/dashboard"} > Go to Dashbord </Link> <br />

      {order.map((o) => {
        return (
          <div key={o._id}>
            {auth.user !== null && auth.user.role === "admin" && o.orderStatus === "delivered" && (
              <div>
                {o.user.map((u) => {
                  return (
                    <div key={u._id}>
                      <p>Order ID : {o._id}</p>
                      <p>Name : {u.name}</p>
                      <p>Email : {u.email}</p>
                      <p>Number : {u.number}</p>
                      <p>Address : {u.address}</p>
                      <p>Order Status : {o.orderStatus}</p>
                      <p>Payment method : {o.paymentMethod}</p>
                    {o.paymentMethod === "Online" && <p> payment verify : <br /> <img style={{width:"300px",height:"300px"}} src={o.paymentVerify.url} alt="" /> </p> }
                    </div>
                  );
                })}
                <h5>products details :</h5> <br />
                {o.productID.map((p) => {
                  return (
                    <div key={p._id}>
                     <p> product image : <br /> <img style={{width:"100px",height:"100px"}} src={p.image.url} alt="" /> </p> 
                      <p>Price : {p.price}</p>
                      <p>Category : {p.category}</p>
                      <p>Quantity : {p.qty}</p>
                      <p>Size : {p.size}</p>
                    </div>
                  );
                })}
                <p>Total Price : { o.total }</p>
              </div>
            )}
      <hr />
          </div>
        );
      })}
    </div>
  );
};

export default DeliveredOrder;
