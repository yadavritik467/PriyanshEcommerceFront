import React, { useEffect, useState } from "react";
import "./Header.css";
import Cookies from "js-cookie";
import logo from "../../WhatsApp Image 2023-07-14 at 15.30.40.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineDashboard } from "react-icons/ai";
import { CartState } from "../../context/contex";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Header = () => {
  const {
    state: { Cart },
  } = CartState();
  const [auth, setAuth] = useAuth();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate()

  const logoutHandler = async () => {
    await setAuth({
      ...auth,
      user: null,
      token: "",
    });
    Cookies.remove("userID");
    toast.success("Logout");
    navigate("/")
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
      <div className={`navbar sticky-top ${isScrolled ? "navbarShadow" : ""}`}>
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

          {auth.user !== null ? (
            <>
              {" "}
              {auth.user.role === "admin" ? (
                <>
                  <Link to={"/admin/dashboard"} >
                    <AiOutlineDashboard style={{fontSize:"28px"}} />
                  </Link>
                  <Link  onClick={logoutHandler}>
                    <BiLogOut style={{fontSize:"28px"}} />
                  </Link>
                </>
              ) : <Link onClick={logoutHandler}>
              <BiLogOut style={{fontSize:"28px"}} />
            </Link>}
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
    </>
  );
};

export default Header;
