import React, { useEffect, useState } from "react";
import "./Cart.css";
import { CartState } from "../../context/contex";
import { Link, useSearchParams } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
const Cart = () => {
  const {
    state: { Cart },
    dispatch,
  } = CartState();
  console.log(Cart);
  const [auth] = useAuth();
  const [amount, setAmount] = useState(0);
  let quryString = window.location.href;
  const [searchParams,] = useSearchParams(quryString);
  let product_id = searchParams.get("id");


  const changeQty = (_id, qty) => {
    dispatch({
      type: "CHANGE_QTY",
      payload: {
        _id,
        qty,
      },
    });
  };

  useEffect(() => {
    setAmount(
      Cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [Cart]);

  const orderHandler = async() =>{
    if(Cart.length === 0){
      toast.error("please add somthing in your cart")
    }
    else if(auth.user === null){
      toast.error("please login to access your order")
    }
    else{
      dispatch({
        type: "CLEAR_ALL",
      })
      toast.success("successfully ordered 😄 ")
    }
  }

  return (
    <>
      <div className="cartItem">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            style={{ margin: "20px", fontSize: "20px" }}
            to={"/shoeProducts"}
          >
            Go back
          </Link>
         {auth.user !== null &&  <Link style={{ margin: "10px", fontSize: "20px" }} to={"/myOrder"}>
            My Order
          </Link>}
        </div>

        {Cart.length > 0 ? (
          Cart.map((c) => {
            return (
              <div key={c._id} className="cartItem-container">
                <Link to={`/product?id=${c._id}`}>
                  {" "}
                  <img src={c.image.url} alt={c.name} />
                </Link>
                <p>
                  <b>Name</b> : {c.name}
                </p>
                <p>
                  <b>Price</b> : ₹ {c.price}/-
                </p>

                <div className="qtyContainer">
                  <button onClick={() => changeQty(c._id, c.qty - 1)}>-</button>
                  <span>{c.qty}</span>
                  <button onClick={() => changeQty(c._id, c.qty + 1)}>+</button>
                  <button
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_CART",
                        payload: {
                          _id: c._id,
                        },
                      }) && toast.success("Remove from cart")
                    }
                  >
                    <RiDeleteBin5Line />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: "center", color: "grey", fontSize: "1.4rem" }}>
            {" "}
            Your cart is empty !!
          </p>
        )}
      </div>

      <div className="cartCalculator">
        <div>
          <p>
            <b>Total Items</b> : {Cart.length}
          </p>
          <p>
            <b>Delivery Charge</b> : ₹ 100/- per item
          </p>
          <p>
            <b>Total Price</b> : ₹ {amount}/-
          </p>
          <p>
            <b>Total Amount</b> : ₹ {amount + Cart.length * 100}/-
          </p>
        </div>

        <button onClick={orderHandler} >Order Now</button>
      </div>
    </>
  );
};

export default Cart;
