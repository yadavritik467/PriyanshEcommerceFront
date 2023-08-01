import React from 'react'
import "../admin.css"
import { Link } from 'react-router-dom'
import { AiOutlineDashboard } from 'react-icons/ai'
import { LiaUserSolid } from 'react-icons/lia'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { BsCardImage } from 'react-icons/bs'
const AdminNavbar = () => {
  return (
    <div className='adminNavbar'> 
      <Link to={"/admin/dashboard"} > Dashboard <AiOutlineDashboard  /></Link>
      <Link to={"/admin/users"}>Users<LiaUserSolid /></Link>
      <Link to={"/admin/products"}>Products <MdProductionQuantityLimits /> </Link>
      <Link to={"/admin/front"}>Front Page <BsCardImage /> </Link>
    </div>
  )
}

export default AdminNavbar
