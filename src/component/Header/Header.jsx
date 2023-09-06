import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./Header.css";
import Cookies from "js-cookie";
import logo from "../../WhatsApp Image 2023-07-14 at 15.30.40.jpg";
import video from "../../video.mp4";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { CartState } from "../../context/contex";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { IoLogoWhatsapp } from "react-icons/io";

const Header = () => {
  const {
    state: { Cart },
  } = CartState();
  const [auth, setAuth] = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [modal, setModal] = useState(true);
  const [height, setHeight] = useState(false);

  const navigate = useNavigate();

  const hieghtHandler = () => {
    setHeight(!height);
  };

  const logoutHandler = async () => {
    await setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("userID");
    toast.success("Logout");
    navigate("/");
  };

  useEffect(() => {}, []);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsScrolled(scrollPosition > 0);
  }, [scrollPosition]);
  return (
    <>
      <div className={`navbar  ${isScrolled ? "navbarShadow" : ""}`}>
        <div className="nav-container-1">
          <Link className="Link" to={"/"}>
            {" "}
            <img src={logo} alt="" />{" "}
          </Link>
        </div>
        <div className="nav-container-1">
          <Link to={"/"} className="title">
            Tranglle Studio
          </Link>
        </div>
        <div className="nav-container-1">
          <Link className="Link " to={"/"}>
            Home{" "}
          </Link>

           {auth.user && auth.user !== null ? (
            <>
              {" "}
              {auth.user.role === "admin" ? (
                <>
                  <Link to={"/admin/dashboard"}>
                    <AiOutlineDashboard style={{ fontSize: "28px" }} />
                  </Link>
                  <Link onClick={logoutHandler}>
                    <BiLogOut style={{ fontSize: "28px" }} />
                  </Link>
                </>
              ) : (
                <>
                  {auth.user.role !== "google" && <Link to={"/myProfile"}>
                    <AiOutlineUser style={{ fontSize: "28px" }} />
                  </Link>}
                  <Link onClick={logoutHandler}>
                    <BiLogOut style={{ fontSize: "28px" }} />
                  </Link>
                </>
              )}
            </>
          ) : (
            <Link className="Link" to={"/login"}>
              Login
            </Link>
          )} 
         
          <Link className="Link" to={"cart"}>
            <BsFillBagCheckFill /> <span>({Cart.length})</span>{" "}
          </Link>
        </div>
      </div>

      {modal === true && (
        <div className="firstContentModalParent">
          <div
            className={`${
              height === false ? "firstContentModal" : "heightHandler"
            }`}
          >
            <RxCross2 onClick={() => setModal(false)} />
            <div>
              <video width={320} height={360} src={video} muted autoPlay loop />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus
                fuga laboriosam possimus consequatur ducimus nobis voluptates
                facilis obcaecati maxime? Esse, a! Aperiam dignissimos saepe
                quae? Facere tempore nam dolor libero labore maiores illum
                doloribus tempora esse! Debitis iste iusto sequi eius esse sunt
                tenetur, in quae ut eos modi officia exercitationem! Mollitia,
                natus! Voluptatum veritatis illo assumenda animi nobis saepe
                dignissimos debitis consequatur dolor esse?
              </p>
            </div>
            <button onClick={hieghtHandler} className="modalButton">
              {" "}
              {height === false ? "read more" : "read less"}
            </button>
          </div>
        </div>
      )}

      <Link className="whatsapp" to={"https://wa.me/7999528461"}>
        <IoLogoWhatsapp />
      </Link>
    </>
  );
};

export default Header;
