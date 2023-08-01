import React from 'react'
import "../admin.css"
import AdminNavbar from '../navbar/AdminNavbar'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <AdminNavbar/>
      <div className='adminDashboard'>
        <Link className="box">
          <p>Totle revenue Rs. 2000/-</p>
        </Link>
        <Link to={"/admin/users"} className="box">
          <p>Totle Users 5</p>
        </Link>
        <Link className="box">
          <p>Totle order</p>
        </Link>
        <Link className="box">
          <p>Totle online order</p>
        </Link>
        <Link className="box">
          <p>Totle COD order</p>
        </Link>
        <Link className="box">
          <p>Cancel order</p>
        </Link>

      </div>
    </div>
  )
}

export default Dashboard
