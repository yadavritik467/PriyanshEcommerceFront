import React, { useEffect, useState } from "react";
import "./MyOrder.css";
import { server } from "../../context/Reducer";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const MyOrder = () => {
  const [order, setOrder] = useState([]);
  const [auth] = useAuth();
  const [id, setId] = useState("");
  const [update] = useState("cancle");

  const cancleHandler = async (_id) => {
    try {
      setId(_id);
      console.log(_id);
      const { data } = await axios.put(`${server}/Order/${id}`, {
        update,
      });

      toast.success("Request sent successfully !!");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      {order.map((o) => {
        return (
          <div key={o._id}>
            {auth.user !== null && o.userID === auth.user._id && (
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
                      {o.paymentMethod === "Online" && (
                        <p>
                          {" "}
                          payment verify : <br />{" "}
                          <img
                            style={{ width: "300px", height: "300px" }}
                            src={o.paymentVerify.url}
                            alt=""
                          />{" "}
                        </p>
                      )}
                    </div>
                  );
                })}
                <h5>products details :</h5> <br />
                {o.productID.map((p) => {
                  return (
                    <div key={p._id}>
                      <p>
                        {" "}
                        product image : <br />{" "}
                        <img
                          style={{ width: "100px", height: "100px" }}
                          src={p.image.url}
                          alt=""
                        />{" "}
                      </p>
                      <p>Category : {p.category}</p>
                      <p>Quantity : {p.qty}</p>
                      <p>Size : {p.size}</p>
                      <p>Price : {p.price}</p>
                    </div>
                  );
                })}
                <p>Total Price : {o.total}</p>
                {o.orderStatus === "processing" && <button
                  onClick={() => cancleHandler(o._id)}
                  style={{
                    backgroundColor: "orange",
                    outline: "none",
                    border: "1px solid grey",
                  }}
                >
                  {" "}
                  Request for cancle{" "}
                </button>}
                <hr style={{ border: "1px solid black" }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MyOrder;
