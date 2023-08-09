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
import { AiOutlineDashboard, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { CartState } from "../../context/contex";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";

const PhoneHeader = () => {
  const {
    state: { Cart },
  } = CartState();
  const [auth, setAuth] = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [modal, setModal] = useState(true);
  const [height,setHeight] = useState(false);
  const [open,setOpen] = useState(false);

  const navigate = useNavigate();
  

  const openHandler = () =>{
    setOpen(!open);
  }

  const hieghtHandler =() =>{
    setHeight(!height);
  }
  

  const logoutHandler = async () => {
    await setAuth({
      ...auth,
      user: null,
      token: "",
    });
    Cookies.remove("token");
    setOpen(false);
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
      <div className={`PhoneNavbar ${isScrolled ? "navbarShadow" : "PhoneNavbar"}`}>
        <div className="nav-container-1">
          <Link onClick={()=>setOpen(false)} className="Link" to={"/"}>
            {" "}
            <img src={logo} alt="" />{" "}
          </Link>
        </div>
       
        <div className="">
        <Link onClick={()=>setOpen(false)} className="Link" to={"cart"}>
            <BsFillBagCheckFill style={{fontSize: "18px" }} /> <span>({Cart.length})</span>{" "}
          </Link>
          <button onClick={openHandler} className="menuBar">{ open === false ? <RiMenu3Line/> : <RxCross2/> }    </button>
         
        </div>
      </div>
      <div className={`${open === true ? "menuBar-Container-open" : "menuBar-Container-close" }`}>
          <Link onClick={()=>setOpen(false)} className="Link " to={"/"}>
            <AiOutlineHome style={{fontSize:"28px",color:"grey"}}/>
          </Link>

          {auth.user !== null ? (
            <>
              {" "}
              {auth.user.role === "admin" ? (
                <>
                  <Link onClick={()=>setOpen(false)} to={"/admin/dashboard"}>
                    <AiOutlineDashboard style={{ fontSize: "28px" }} />
                  </Link>
                  <Link onClick={logoutHandler}>
                    <BiLogOut style={{ fontSize: "28px" }} />
                  </Link>
                </>
              ) : (
                <>
                  <Link onClick={()=>setOpen(false)} to={"/myProfile"}>
                    <AiOutlineUser style={{ fontSize: "28px" }} />
                  </Link>
                  <Link onClick={logoutHandler}>
                    <BiLogOut style={{ fontSize: "28px" }} />
                  </Link>
                </>
              )}
            </>
          ) : (
            <Link onClick={()=>setOpen(false)} className="Link" to={"/login"}>
              Login
            </Link>
          )}
          </div>

      
    </>
  );
};

export default PhoneHeader;
