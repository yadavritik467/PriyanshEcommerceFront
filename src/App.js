import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster } from "react-hot-toast"

import Header from './component/Header/Header';
import Home from './component/Home/Home';

import ShoeProducts from './component/products/ShoeProducts';
import BeltProducts from './component/products/BeltProducts';
import CapProducts from './component/products/CapProducts';
import Footer from './component/Footer/Footer';
import SearchProducts from './component/products/SearchProducts';
import SignUp from './component/auth/SignUp';
import Login from './component/auth/Login';
import ShirtProducts from './component/products/ShirtProducts';

import { useState } from 'react';
import Cart from './component/Cart/Cart';
import SingleProduct from './component/products/SingleProduct';
import { useAuth } from './context/auth';
import NopageFound from './component/nfp/NopageFound';
import Dashboard from './component/admin/dashboard/Dashboard';
import AdminUsers from './component/admin/users/AdminUsers';
import AdminProducts from './component/admin/products/AdminProducts';
import AdminFront from './component/admin/front/AdminFront';
import MyProfile from './component/myProfile/MyProfile';
import ForgotPassword from './component/forgotPassword/ForgotPassword';
import ResetPassword from './component/forgotPassword/ResetPassword';
import MyOrder from './component/MyOrder/MyOrder';
import AllOrder from './component/admin/orders/AllOrders';
import OnlineOrder from './component/admin/orders/OnlineOrder';
import CODOrder from './component/admin/orders/CODOrder';
import DeliveredOrder from './component/admin/orders/DeliveredOrders';
import CancleOrder from './component/admin/orders/CancleOrder';
import PhoneHeader from './component/Header/PhoneHeader';

function App() {
  const [auth] = useAuth()
  const [id, setId] = useState("")
  return (
    <Router>
      <div className="App">
        <Header />
        <PhoneHeader/>
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/myProfile' element={ auth.user !== null ? <MyProfile /> : <Login />  } />
          <Route path='/cart' element={<Cart />} />
          <Route path='/myOrder' element={<MyOrder />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />

          {auth.user !== null && auth.user.role === "admin" ?
          
          (<>
            <Route path='/admin/dashboard' element={<Dashboard/>} />
            <Route path='/admin/totalOrders' element={<AllOrder/>} />
            <Route path='/admin/onlineOrders' element={<OnlineOrder/>} />
            <Route path='/admin/CODOrders' element={<CODOrder/>} />
            <Route path='/admin/deliveredOrders' element={<DeliveredOrder/>} />
            <Route path='/admin/cancleOrders' element={<CancleOrder/>} />
            <Route path='/admin/users' element={<AdminUsers/>} />
            <Route path='/admin/products' element={<AdminProducts/>} />
            <Route path='/admin/front' element={<AdminFront/>} />
          </>) : (<Route path='*' element={<NopageFound />} />)}


          <Route path='/searchProducts' element={<SearchProducts />} />
          <Route path='/product' element={<SingleProduct id={id} setId={setId} />} />
          <Route path='/shoeProducts' element={<ShoeProducts />} />
          <Route path='/shirtProducts' element={<ShirtProducts />} />
          <Route path='/capProducts' element={<CapProducts />} />
          <Route path='/beltProducts' element={<BeltProducts />} />
          <Route path='*' element={<NopageFound />} />
        </Routes>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
