import "./Products.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CartState } from "../../context/contex";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FadeIn } from "react-slide-fade-in";

const SearchProducts = () => {
  const {
    state: { Cart, Product },
    dispatch,
  } = CartState();

  // ssearch products

  const data = Product;
  const [searchQuery, setSearchQuery] = useState("");
 
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  
  // console.log(filteredData);

  return (
    <div
  >
      {" "}
      <br />
      <Link
        to={"/searchProducts"}
        className="searchButton"
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "320px", margin: " 0 20px", textAlign: "center" }}
          type="text"
          placeholder="Search Your Products here .."
        />
        
      </Link>
      <div className="allProductsParent">
        { filteredData.length !==0 ? filteredData.map((pro) => (
          <div key={pro._id} className="allProducts">
            <Link to={`/product?id=${pro._id}`}>
              <img src={pro.image.url} alt={pro.name} />
            </Link>
            <p>
              <b>Name </b>: {pro.name}
            </p>
            <p>
              <b>Price</b> : ₹{pro.price}/-
            </p>
            {/* <button onClick={()=> deleteHandler(pro._id)}>delete item</button> */}
            {Cart.some((c) => c._id === pro._id) ? (
              <button
                onClick={() => {
                  dispatch({
                    type: "REMOVE_CART",
                    payload: {
                      _id: pro._id,
                    },
                  });
                }}
              >
                {" "}
                Remove Item <RiDeleteBin5Line />{" "}
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch({
                    type: "ADD_CART",
                    payload: {
                      _id: pro._id,
                      name: pro.name,
                      image: pro.image,
                      price: pro.price,
                      category:pro.category,
                      qty: 1,
                    },
                  });
                }}
              >
                Add to Cart <BsFillCartCheckFill />
              </button>
            )}
          </div>
        )) : <p style={{fontSize:"20px",color:"grey"}}> No products found. . </p>
        }
      </div>
    </div>
  );
};

export default SearchProducts;
