import React from "react";
import { Link } from "react-router-dom";
import { CartState } from "../../context/contex";

import "./Products.css";
import Products from "./Products";


const ShoeProducts = () => {
  const {
    state: { Product },
  } = CartState();

  // console.log(Product);

 

  return (
    <>
      <div className="productListIcon">
        <Link to={"/shoeProducts"}>👟</Link>
        <Link to={"/shirtProducts"}>👕</Link>
        <Link to={"/capProducts"}>🧢</Link>
        <Link to={"/beltProducts"}>
          {" "}
          <img
            src="https://images.meesho.com/images/products/55087549/ztmnv_512.webp"
            alt=""
          />{" "}
        </Link>

        

      </div>
      <Link to={"/searchProducts"} style={{position:"fixed",top:"200px", padding:"",}}> <input style={{width:"320px",margin:" 0 20px",textAlign:"center"}} type="text" placeholder="Search Your Products here .." /> </Link>
      <br />  <br />

      <div className='allProductsParent'>
       
        {Product.map((pro) => {
          if (pro.category === "shoe") {
            return (
              
                <div key={pro._id} >
                 <Products pro={pro}/>
                </div>
              
            );
          }
        })}
      </div>
    </>
  );
};

export default ShoeProducts;
