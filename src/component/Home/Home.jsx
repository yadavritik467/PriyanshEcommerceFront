import React, { useEffect, useState } from "react";
import {motion } from "framer-motion"
import "./Home.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { server } from "../../context/Reducer";
import axios from "axios";
const Home = () => {
  const [content_1, setContent_1] = useState([]);
  const [content_2, setContent_2] = useState([]);
  const [caro, setCaro] = useState([]);

  // content handle 1

  const getAllContent_1 = async () => {
    try {
      const { data } = await axios.get(`${server}/getContent_1`);

      setContent_1(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContent_1();
  }, []);

  //   /content handle 2

  const getAllContent_2 = async () => {
    try {
      const { data } = await axios.get(`${server}/getContent_2`);

      setContent_2(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContent_2();
  }, []);

  //   carousel handle

  const getAllCarousel = async () => {
    try {
      const { data } = await axios.get(`${server}/getCarousel`);

      setCaro(data.carousel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCarousel();
  }, []);

  return (
    <>
     
        {content_1.map((c) => {
          return (
            <div key={c._id} className="home-image">
              <motion.img  initial={{
            y: "-100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.1,
          }} className="shoeImg" src={c.image.url} alt="" />
              <motion.p initial={{
            x: "-100%",
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.1,
          }}>{c.description}</motion.p>
            </div>
          );
        })}
    

     
        {content_2.map((c) => {
          return (
            <div key={c._id} className="home-image_1">
              <motion.img initial={{
            y: "-100%",
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }} className="shoeImg" src={c.image.url} alt="" />

              <motion.p initial={{
            x: "-100%",
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}>{c.description}</motion.p>
            </div>
          );
        })}
     
     

      <Carousel  className="carousel">
        <Carousel.Item>
          {caro.map((c)=>(

        <div key={c._id}>
            <img
            className="caro_img"
            src={c.image.url}
          />
        </div>
          ))}
          <Carousel.Caption>
            <Link to={"/searchProducts"}>
              <button>Shop Now</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
       
      </Carousel>
      

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
      
        
  
       
    </>
  );
};

export default Home;








