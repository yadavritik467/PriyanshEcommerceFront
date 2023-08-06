import React, { useEffect, useState } from "react";
import "./Cart.css";
import { CartState } from "../../context/contex";
import { Link, useSearchParams } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { server } from "../../context/Reducer";
import axios from "axios";
import { Modal } from "react-bootstrap";
const Cart = () => {
  //

  //

  const {
    state: { Cart },
    dispatch,
  } = CartState();
  // console.log(Cart);
  const [auth] = useAuth();
  const [amount, setAmount] = useState(0);
  const [size, setSize] = useState("size");
  const [image, setImage] = useState("");
  const [paymentMethod ] = useState("COD");
  const [orderModal, setOrderModal] = useState(false);


  let quryString = window.location.href;
  const [searchParams] = useSearchParams(quryString);
  let product_id = searchParams.get("id");


  const handleChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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

  const orderHandler = async () => {
    if (Cart.length === 0) {
      toast.error("please add somthing in your cart");
    } else if (auth.user === null) {
      toast.error("please login to access your order");
    } else if (size === "size") {
      toast.error("please set your size");
    } else {
      setOrderModal(true)
      
    }
  };

  const onlineOrderhandler = async( amount) =>{
    try {
      let orderDetails = {};
      orderDetails.total = amount;
      orderDetails.paymentVerify = image;
      orderDetails.productID = Cart;
      orderDetails.user = auth.user;
      orderDetails.userID = auth.user._id;

      await axios.post(`${server}/newOrder`, {
        orderDetails,
        amount,
      });

      // console.log(orderDetails);
      dispatch({
        type: "CLEAR_ALL",
      })
      setOrderModal(false);
      toast.success("successfully ordered 😄 ");
    } catch (error) {
      console.log(error);
    }
  }

  const codOrderHandler = async( amount) =>{
    try {
      let orderDetails = {};
      orderDetails.total = amount;
      orderDetails.paymentMethod = paymentMethod;
      orderDetails.productID = Cart;
      orderDetails.user = auth.user;
      orderDetails.userID = auth.user._id;

      await axios.post(`${server}/newOrderCod`, {
        orderDetails,
        amount,
      });

      // console.log(orderDetails);
      dispatch({
        type: "CLEAR_ALL",
      })
      setOrderModal(false)
      toast.success("successfully ordered 😄 ");
    } catch (error) {
      console.log(error);
    }
  }

  const cartItemSize = (_id, productSize) => {
    setSize(productSize);
    Cart.map((c) => {
      if (c._id === _id) {
        c.size = productSize;
      }
    });
    // console.log(Cart, "hello");
  };

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
          {auth.user !== null && (
            <Link style={{ margin: "10px", fontSize: "20px" }} to={"/myOrder"}>
              My Order
            </Link>
          )}
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

                {c.category === "belt" && (
                  <div className="qtyContainer">
                    <button onClick={() => changeQty(c._id, c.qty - 1)}>
                      -
                    </button>
                    <span>{c.qty}</span>
                    <button onClick={() => changeQty(c._id, c.qty + 1)}>
                      +
                    </button>
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
                )}
                {c.category === "cap" && (
                  <div className="qtyContainer">
                    <button onClick={() => changeQty(c._id, c.qty - 1)}>
                      -
                    </button>
                    <span>{c.qty}</span>
                    <button onClick={() => changeQty(c._id, c.qty + 1)}>
                      +
                    </button>
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
                )}
                {c.category === "shoe" && (
                  <div className="qtyContainer">
                    <p>
                      {" "}
                      <select
                        onChange={(e) => cartItemSize(c._id, e.target.value)}
                      >
                        <option value="size">size</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </p>
                    <button onClick={() => changeQty(c._id, c.qty - 1)}>
                      -
                    </button>
                    <span>{c.qty}</span>
                    <button onClick={() => changeQty(c._id, c.qty + 1)}>
                      +
                    </button>
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
                )}
                {c.category === "shirt" && (
                  <div className="qtyContainer">
                    <p>
                      {" "}
                      <select
                        onChange={(e) => cartItemSize(c._id, e.target.value)}
                      >
                        <option value="size">size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </p>
                    <button onClick={() => changeQty(c._id, c.qty - 1)}>
                      -
                    </button>
                    <span>{c.qty}</span>
                    <button onClick={() => changeQty(c._id, c.qty + 1)}>
                      +
                    </button>
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
                )}
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

        <button onClick={ orderHandler}>
          Order Now
        </button>

        {orderModal === true && (
          <div className="orderModal">
            <div className="orderPayment">
              <img src="" alt="" />
              <small>please upload your screen shot here !!</small>
              <input
                style={{ textAlign: "center" }}
                required={true}
                type="file"
                name="image"
                files="image"
                accept="image/*"
                onChange={handleChange}
              />
              
              <button onClick={() => onlineOrderhandler(amount + Cart.length * 100)}>
                Order Now with online
              </button>
              <small>Or</small>
              <button onClick={() => codOrderHandler(amount + Cart.length * 100)}>
          Order Now with cod
        </button>
              <button onClick={() =>setOrderModal(false)}>
          cancel
        </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
