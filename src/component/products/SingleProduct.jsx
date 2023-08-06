import React, { useState } from "react";
import "./Products.css";
import { Link, useSearchParams } from "react-router-dom";
import { CartState } from "../../context/contex";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FadeIn } from "react-slide-fade-in";

const SingleProduct = () => {
  const {
    state: { Product, Cart },
    dispatch,
  } = CartState();
  let quryString = window.location.href;
  const [searchParams, setSearchParams] = useSearchParams(quryString);
  let product_id = searchParams.get("id");

 

//   console.log(product_id, quryString);
  return (
    <FadeIn
    from=""
    positionOffset={0}
    triggerOffset={0}
    delayInMilliseconds={10}
  >
      {Product.map((pro) => {
        if (pro._id === product_id) {
          return (
            <div key={pro._id} className="singleProducts">
             
                <Link to={`/product?id=${pro._id}`}>
                  <img src={pro.image.url} alt={pro.name} />
                </Link>
             
              <div>
              <p>
                <b>Name </b>: {pro.name}
              </p>
              <p>
                <b>Category </b>: {pro.category}
              </p>
              <p>
                <b>Description</b> : <span>{pro.description}</span>
              </p>
              <p>
                <b>Price</b> : ₹{pro.price}/-
              </p>
              <p>
                <b>Delivery Charge</b> : ₹ 100 /-
              </p>
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
            </div>
          );
        }
      })}
    </FadeIn>
  );
};

export default SingleProduct;
