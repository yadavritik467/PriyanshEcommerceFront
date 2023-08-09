import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";
import { CartState } from "../../../context/contex";

import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../../../context/Reducer";
import { AiOutlineDashboard } from "react-icons/ai";
import { LiaUserSolid } from "react-icons/lia";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";

const AdminProducts = () => {
  // ----------- for Admin handler from here

  const [load, setLoad] = useState(false);
  const [Product, setproduct] = useState([]);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [id, setId] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const getAllproducts = async () => {
    try {
      setLoad(true);

      const { data } = await axios.get(`${server}/allProducts`);
      if (data) {
        setproduct(data.products);
      }
      setLoad(false);
    } catch (error) {
      console.log(error);
      toast.error("server error please wait or refresh");
      setLoad(false);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();

    try {
      setLoad(true);
      const { data } = await axios.post(`${server}/createProduct`, {
        image,
        name,
        price,
        category,
      });
      if (data) {
        toast.success("item created ");
        //  console.log("item created ");
      }
      console.log(data);
      setLoad(false);
      getAllproducts();
    } catch (error) {
      console.error(error);
      toast.error("network error");
      setLoad(false);
    }
  };
  // ----------- for Admin handler to here

  const deleteHandler = async (_id) => {
    try {
      const { data } = await axios.delete(`${server}/product/${_id}`);
      toast.success(data.message);
      getAllproducts();
    } catch (error) {
      console.error(error);
    }
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoad(true);
      const { data } = await axios.put(`${server}/product/${id}`, {
        image,
        name,
        price,
        category,
      });
      setUpdateLoad(false);
      toast.success(data.message);
      setUpdateModal(false);
      getAllproducts();
    } catch (error) {
      console.error(error);
      setUpdateLoad(false);
    }
  };

  const openModal = (_id) => {
    setUpdateModal(true);
    setId(_id);
  };
  const closeModal = () => {
    setUpdateModal(false);
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

      <form
        action=""
        onSubmit={createHandler}
        style={{
          width: "90%",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
          margin: "10px",
        }}
      >
        <input
          style={{ textAlign: "center" }}
          required={true}
          type="file"
          name="image"
          files="image"
          accept="image/*"
          onChange={handleChange}
        />
        <input
          style={{ textAlign: "center" }}
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Product name .."
        />
        <input
          style={{ textAlign: "center" }}
          required={true}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="Product description .."
        />
        
        <input
          style={{ textAlign: "center" }}
          required={true}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Product price .."
        />
        <input
          style={{ textAlign: "center" }}
          required={true}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          type="text"
          placeholder="Product category .."
        />
        <button
          style={{
            backgroundColor: "lightgrey",
            outline: "none",
            border: "1px solid grey",
          }}
          type="submit"
        >
          create{" "}
        </button>
      </form>

      {load === true ? (
        <div
          style={{
            width: "100%",
            height: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "1.7rem" }}>Loading</p>
        </div>
      ) : (
        <div className="allProductsParent">
          {Product.map((pro) => {
            return (
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
                <button onClick={() => openModal(pro._id)}>
                  update product
                </button>
                <button onClick={() => deleteHandler(pro._id)}>
                  delete product
                </button>

                {updateModal === true && id === pro._id ? (
                  <form
                    action=""
                    onSubmit={updateHandler}
                    style={{
                      width: "90%",
                      position: "relative",
                      gap: "10px",
                      display: "flex",
                      flexDirection: "column",
                      margin: "10px",
                    }}
                  >
                    <input
                      style={{ textAlign: "center" }}
                      type="file"
                      name="image"
                      files="image"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <input
                      style={{ textAlign: "center" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Product name .."
                    />
                    <input
                      style={{ textAlign: "center" }}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      type="number"
                      placeholder="Product price .."
                    />
                    <input
                      style={{ textAlign: "center" }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      type="text"
                      placeholder="Product category .."
                    />
                    <input
                      style={{ textAlign: "center" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      type="text"
                      placeholder="Product description .."
                    />
                    <button
                      style={{
                        backgroundColor: "lightgrey",
                        outline: "none",
                        border: "1px solid grey",
                      }}
                      type="submit"
                    >
                      {updateLoad === true ? "Loading" : "update product"}
                    </button>
                    <button
                      style={{
                        backgroundColor: "lightgrey",
                        outline: "none",
                        border: "1px solid grey",
                      }}
                      type="submit"
                      onClick={() => setUpdateModal(false)}
                    >
                      cancel
                    </button>
                  </form>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AdminProducts;
