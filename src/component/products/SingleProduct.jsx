import React from "react";
import "./Products.css";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CartState } from "../../context/contex";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillCartCheckFill } from "react-icons/bs";

const SingleProduct = () => {
  const {
    state: { Product, Cart },
    dispatch,
  } = CartState();
  let quryString = window.location.href;
  const [searchParams] = useSearchParams(quryString);
  let product_id = searchParams.get("id");

  const shareHandler = () => {
    if (navigator.share) {
      navigator
        .share({
          url: window.location.href,
        })
        .then(() => console.log("share success"))
        .catch((error) => console.log("share error", error));
    } else {
      console.log("not supported on this device");
    }
  };

  //   console.log(product_id, quryString);
  return (
    <>
      {Product.map((pro) => {
        if (pro._id === product_id) {
          return (
            <div key={pro._id} className="singleProducts">
              <Link to={`/product?id=${pro._id}`}>
                <motion.img initial={{
            x: "-100%",
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }} src={pro.image.url} alt={pro.name} />
              </Link>

              <motion.div
                initial={{
                  y: "-100%",
                  opacity: 0,
                }}
                whileInView={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
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
                          category: pro.category,
                          qty: 1,
                        },
                      });
                    }}
                  >
                    Add to Cart <BsFillCartCheckFill />
                  </button>
                )}{" "}
                <br />
                <button onClick={shareHandler}> Share Product </button>
              </motion.div>
            </div>
          );
        }
   }   )}
    </>
  );
};

export default SingleProduct;
