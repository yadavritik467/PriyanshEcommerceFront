import React, { useEffect, useState } from "react";
import "../admin.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaUserSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { server } from "../../../context/Reducer";
import axios from "axios";

const AdminFront = () => {
  const [load1, setLoad1] = useState(false);
  const [load2, setLoad2] = useState(false);
  const [load3, setLoad3] = useState(false);

  const[content_1,setContent_1] = useState([]);
  const[content_2,setContent_2] = useState([]);
  const[caro,setCaro] = useState([]);

  const [image_1, setImage_1] = useState("");
  const [description_1, setDescription_1] = useState("");

  const [image_2, setImage_2] = useState("");
  const [description_2, setDescription_2] = useState("");

  const [image_3, setImage_3] = useState("");

  // content handle 1

  const handleChange_1 = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage_1(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const contentHandler_1 = async (e) => {
    e.preventDefault();
    try {
      setLoad1(true);
      await axios.post(`${server}/update_1`, {
        image_1,
        description_1,
      },{
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      });
      toast.success("content updated");
      getAllContent_1();
      setLoad1(false);
    } catch (error) {
      console.log(error);
      setLoad1(false);
    }
  };



  const getAllContent_1 = async () => {
 try {
    const {data} = await axios.get(`${server}/getContent_1`,{
      headers: {
        Authorization: JSON.parse(localStorage.getItem("userID")).token,
      },
    })
    
    setContent_1(data.content)
 } catch (error) {
    console.log(error);
 }
  };

  useEffect(() => {
    getAllContent_1();
  }, []);



  const contentDelete_1 = async (_id) => {
    try {
        await axios.delete(`${server}/deleteContent_1/${_id}`,{
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userID")).token,
          },
        })
        toast.success("content deleted")
        getAllContent_1();
    } catch (error) {
        console.error(error)
    }
  };



  //   /content handle 2
  const handleChange_2 = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage_2(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const contentHandler_2 = async (e) => {
    e.preventDefault();
    try {
      setLoad2(true);
      await axios.post(`${server}/update_2`, {
        image_2,
        description_2,
      },{
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      });
      toast.success("content updated");
      getAllContent_2();
      setLoad2(false);
    } catch (error) {
      console.log(error);
      setLoad2(false);
    }
  };

  
  const getAllContent_2 = async () => {
    try {
       const {data} = await axios.get(`${server}/getContent_2`,{
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      })
       
       setContent_2(data.content)
    } catch (error) {
       console.log(error);
    }
     };
   
     useEffect(() => {
       getAllContent_2();
     }, []);
   
   
   
     const contentDelete_2 = async (_id) => {
       try {
           await axios.delete(`${server}/deleteContent_2/${_id}`,{
            headers: {
              Authorization: JSON.parse(localStorage.getItem("userID")).token,
            },
          })
           toast.success("content deleted")
           getAllContent_2();
       } catch (error) {
           console.error(error)
       }
     };

  //   carousel handle

  const handleChange_3 = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage_3(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const carouselHandler = async (e) => {
    e.preventDefault();
    try {
      setLoad3(true);
      await axios.post(`${server}/update_3`, {
        image_3,
      },{
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      });
      toast.success("corousel updated");
      setLoad3(false);
      getAllCarousel();
    } catch (error) {
      console.log(error);
      setLoad3(false);
    }
  };

  
  const getAllCarousel = async () => {
    try {
       const {data} = await axios.get(`${server}/getCarousel`,{
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userID")).token,
        },
      })
       
       setCaro(data.carousel)
    } catch (error) {
       console.log(error);
    }
     };
   
     useEffect(() => {
       getAllCarousel();
     }, []);
   
   
   
     const caroDelete_1 = async (_id) => {
       try {
           await axios.delete(`${server}/deleteCarousel/${_id}`,{
            headers: {
              Authorization: JSON.parse(localStorage.getItem("userID")).token,
            },
          })
           toast.success("caro deleted")
           getAllCarousel();
       } catch (error) {
           console.error(error)
       }
     };
  return (
    <>
      <div className="adminNavbar">
        <Link to={"/admin/dashboard"}>
          {" "}
          Dashboard <AiOutlineDashboard />
        </Link>
        <Link to={"/admin/users"}>
          Users
          <LiaUserSolid />
        </Link>
        <Link to={"/admin/products"}>
          Products <MdProductionQuantityLimits />{" "}
        </Link>
        <Link to={"/admin/front"}>
          Front Page <BsCardImage />{" "}
        </Link>
      </div>
     
      
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            border:"1px solid black",
            width: "100%",
          }}
        >
          <form
            onSubmit={contentHandler_1}
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
              width: "350px",
              gap: "15px",
              border: "1px solid grey",
              margin: "10px 0",
              padding: "5px 10px",
            }}
          >
            <h5 style={{ color: "grey" }}>image/content handle 1</h5>
            <input
              style={{ textAlign: "center" }}
              type="file"
              name="image"
              files="image"
              accept="image/*"
              onChange={handleChange_1}
            />
            <input
              style={{ textAlign: "center" }}
              value={description_1}
              onChange={(e) => setDescription_1(e.target.value)}
              type="text"
              placeholder="Product description .."
            />
            <button type="submit">
              {load1 === true ? "loading" : "update"}{" "}
            </button>
          </form>
          <form
            onSubmit={contentHandler_2}
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
              width: "350px",
              gap: "15px",
              border: "1px solid grey",
              margin: "10px 0",
              padding: "5px 10px",
            }}
          >
            <h5 style={{ color: "grey" }}>image/content handle 2</h5>
            <input
              style={{ textAlign: "center" }}
              required={true}
              type="file"
              name="image"
              files="image"
              accept="image/*"
              onChange={handleChange_2}
            />
            <input
              style={{ textAlign: "center" }}
              required={true}
              value={description_2}
              onChange={(e) => setDescription_2(e.target.value)}
              type="text"
              placeholder="Product description .."
            />
            <button type="submit">
              {load2 === true ? "loading" : "update"}{" "}
            </button>
          </form>
          <form
            onSubmit={carouselHandler}
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
              width: "350px",
              gap: "15px",
              border: "1px solid grey",
              margin: "10px 0",
              padding: "5px 10px",
            }}
          >
            <h5 style={{ color: "grey" }}>carousel update</h5>
            <input
              style={{ textAlign: "center" }}
              required={true}
              type="file"
              name="image"
              files="image"
              accept="image/*"
              onChange={handleChange_3}
            />

            <button type="submit">
              {load3 === true ? "loading" : "update"}{" "}
            </button>
          </form>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"10px",}}>
          <div style={{width:"100%", margin:"10px"}} action="">
            <h5 style={{ color: "grey" }}>image/content items 1</h5>
            {content_1.map((c)=>{
                return(
                    <div key={c._id}>
                        <img style={{width:"200px"}} src={c.image.url} alt="" />
                        <p>{c.description}</p>
                        <button onClick={()=>contentDelete_1(c._id)}>Delete</button>
                    </div>
                )
            })}

          </div>
          <div  style={{width:"100%", margin:"10px"}} action="">
            <h5 style={{ color: "grey" }}>image/content items 2</h5>
            {content_2.map((c)=>{
                return(
                    <div key={c._id}>
                        <img style={{width:"200px"}} src={c.image.url} alt="" />
                        <p>{c.description}</p>
                        <button onClick={()=>contentDelete_2(c._id)}>Delete</button>
                    </div>
                )
            })}
          </div>
          <div style={{width:"100%", margin:"10px"}} action="">
            <h5 style={{ color: "grey" }}>carousel items</h5>
            {caro.map((c)=>{
                return(
                    <div key={c._id}> <br />
                        <img style={{width:"200px"}} src={c.image.url} alt="" /> <br /> <br />
                        <button onClick={()=>caroDelete_1(c._id)}>Delete</button>
                    </div>
                )
            })}
          </div>
        </div>
      
    </>
  );
};

export default AdminFront;
