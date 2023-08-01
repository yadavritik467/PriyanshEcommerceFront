import React from "react";
import "./Loader.css";
import { toast } from "react-hot-toast";

function Loader(){
  
  return (
      <>
      {/* {toast.success("Loading please wait...")} */}
      <div className="loader">
        <p>Loading...</p>
        <div className="inner-loader"></div>
      </div>
      </>   
  );
};

export default Loader;
