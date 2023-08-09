import React, { useState } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import "./Products.css";
import { Link } from "react-router-dom";
import { CartState } from "../../context/contex";
import { server } from "../../context/Reducer";
import axios from "axios";
import { toast } from "react-hot-toast";
import {motion} from "framer-motion"


const Products = ({pro}) => {
  const {
    state:{Cart},
    dispatch
  } = CartState();
  console.log(Cart)

  const[size,setSize]=useState("size")

  const shareHandler = () =>{
   if(navigator.share){
    navigator.share({
      url:window.location.href,
    })
    .then(()=>console.log("share success"))
    .catch((error)=>console.log("share error",error))
   }else{
    console.log("not supported on this device")
   }
  }

  const deleteHandler = async(_id) =>{
     try {
      const {data} = await axios.delete(`${server}/product/${_id}`)
      toast.success(data.message)
     } catch (error) {
      console.error(error)
     }
  }
  return (
    <>
  

     
    <div key={pro._id} className="allProducts">
      <Link to={`/product?id=${pro._id}`}><motion.img initial={{
            y: "-100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
          }} src={pro.image.url} alt={pro.name} /></Link>
      <p>
        <b>Name </b>: {pro.name}
      </p>
      <p>
        <b>Price</b> : ₹{pro.price}/-
      </p>
      {/* <button onClick={()=> deleteHandler(pro._id)}>delete item</button> */}
      {Cart.some((c)=>c._id === pro._id)? (
           <button onClick={()=>{
            dispatch({
              type:"REMOVE_CART",
              payload:{
                _id:pro._id
              }
            })
           }}> Remove Item <RiDeleteBin5Line /> </button>
      ):( <button onClick={()=>{
        dispatch({
          type:"ADD_CART",
          payload:{
            _id:pro._id,
            name:pro.name,
            image:pro.image,
            price:pro.price,
            category:pro.category,
            qty:1
          }
        })
      }}>Add to Cart  <BsFillCartCheckFill /></button>)}
    </div>
   
    </>
  );
};

export default Products;
