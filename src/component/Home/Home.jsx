import React, { useEffect, useState } from "react";
import { FadeIn } from "react-slide-fade-in";

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
      <FadeIn
        from="left"
        positionOffset={80}
        triggerOffset={100}
        delayInMilliseconds={400}
      >
        {content_1.map((c) => {
          return (
            <div key={c._id} className="home-image">
              <img className="shoeImg" src={c.image.url} alt="" />
              <p>{c.description}</p>
            </div>
          );
        })}
      </FadeIn>

      <FadeIn
        from="right"
        positionOffset={80}
        triggerOffset={100}
        delayInMilliseconds={400}
      >
        {content_2.map((c) => {
          return (
            <div key={c._id} className="home-image_1">
              <img className="shoeImg" src={c.image.url} alt="" />

              <p>{c.description}</p>
            </div>
          );
        })}
      </FadeIn>
      <FadeIn
        from="left"
        positionOffset={80}
        triggerOffset={100}
        delayInMilliseconds={400}
      >

      <Carousel className="carousel">
        <Carousel.Item>
          <img
            className="caro_img"
            src="https://img.freepik.com/free-photo/men-shoes_1203-8387.jpg?w=1060&t=st=1689413981~exp=1689414581~hmac=73531457faf6624e5c4d67542f7d09392fc84590ebf5605314adc0e0f2efacc7"
            alt="First slide"
          />
          <Carousel.Caption>
            <Link to={"/searchProducts"}>
              <button>Shop Now</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="caro_img"
            src="https://img.freepik.com/free-photo/men-shoes_1203-8387.jpg?w=1060&t=st=1689413981~exp=1689414581~hmac=73531457faf6624e5c4d67542f7d09392fc84590ebf5605314adc0e0f2efacc7"
            alt="First slide"
          />
          <Carousel.Caption>
            <Link to={"/products"}>
              <button>Shop Now</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </FadeIn>

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








