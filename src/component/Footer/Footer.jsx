import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="nav-container-1">
        <Link to={"/"} className='title'>Tranglle Studio</Link>
       
      </div>
        <div className="footer-container-1">
            <h2 style={{color:"grey"}}>Follow us on</h2>

        <Link to={"/"} className='Link'>instagram</Link> <br />

        <Link to={"/"} className='Link'>WhatsApp</Link> <br />
        <Link to={"/"} className='Link'>Facebook</Link> <br />
       
      </div>
        <div className="footer-container-1">
            <h2 style={{color:"grey"}}>Follow us on</h2>

        <Link to={"/"} className='Link'>instagram</Link> <br />

        <Link to={"/"} className='Link'>WhatsApp</Link> <br />
        <Link to={"/"} className='Link'>Facebook</Link> <br />
       
      </div>
      
    </div>
  )
}

export default Footer
