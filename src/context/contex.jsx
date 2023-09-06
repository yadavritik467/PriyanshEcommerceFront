import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import Loader from "../component/Loader/Loader";
import { cartReducer, searchReducer, server } from "./Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [load, setLoad] = useState(false);


  const [searchState, searchDispatch] = useReducer(searchReducer, {
    searchQuery: "",
  });

  const [state, dispatch] = useReducer(cartReducer, {
    Product: [],
    // Cart: [],
    Cart: localStorage.getItem("addToCart")
    ? JSON.parse(localStorage.getItem("addToCart"))
    : [],
  });



  const getAllProducts = async () => {
    try {
      setLoad(true);

      const { data } = await axios.get(
        `${server}/allProducts`
      );
      console.log(data);
      setLoad(false);
      dispatch({
        type:"ADD_PRODUCT",
        payload:data.products
      })

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);


  useEffect(() => {
    localStorage.setItem("addToCart", JSON.stringify(state.Cart));
  }, [state.Cart]);

  return (
    <Cart.Provider value={{ state, dispatch,searchState, searchDispatch }}>
      {load && <Loader/>}
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
