import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Products from './Products';
import { CartState } from '../../context/contex';

const CapProducts = () => {

    const {
      state: { Product },
    } = CartState();

    const [selectedPriceRange, setSelectedPriceRange] = useState('');

  
    // Filter the products based on the selected price range
    const filteredProducts = Product.filter(product => {
      if (selectedPriceRange === 'all') {
        // If "All" is selected, show all products
        return  product;
      } else if (selectedPriceRange === '0-to-500') {
        return product.price <= 500;
      } else if (selectedPriceRange === '500-to-1000') {
        return product.price >= 500 && product.price <= 1000;
      } else if (selectedPriceRange === '1000-to-1500') {
        return product.price >= 1000 && product.price <= 1500;
      }
       else if (selectedPriceRange === '1500-to-2000') {
        return product.price >= 1500 && product.price <= 2000;
      }
       else if (selectedPriceRange === '2000-to-2500') {
        return product.price >= 2000 && product.price <= 2500;
      }
       else if (selectedPriceRange === '2500-to-3000') {
        return product.price >= 2500 && product.price <= 3000;
      }
       else if (selectedPriceRange === '3000-to-3500') {
        return product.price >= 3000 && product.price <= 3500;
      }
       else if (selectedPriceRange === '3500-to-4000') {
        return product.price >= 3500 && product.price <= 4000;
      }
      return Product;
    });

  return (
    <>
     <div className="productListIcon">
      <Link to={"/shoeProducts"} >👟</Link>
      <Link to={"/shirtProducts"}>👕</Link>
      <Link to={"/capProducts"}>🧢</Link>
      <Link to={"/beltProducts"}> <img src="https://images.meesho.com/images/products/55087549/ztmnv_512.webp" alt="" /> </Link>
    </div>
    <div  className="allContainerWithFilter">
     <div className="filterFunction">
     <Link to={"/searchProducts"} style={{position:"",top:"150px", padding:"",}}> <input style={{width:"320px",margin:" 0 20px",textAlign:"center"}} type="text" placeholder="Search Your Products here .." />
      
      </Link>
     <Link style={{position:"",top:"200px", padding:"",}}> 
     <p style={{ width: "320px", margin: " 0 20px", textAlign: "center",color:"black" }}>
      set Price : <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)} >
      <option value="all">All</option>
      <option value="0-to-500">0 - 500</option>
      <option value="500-to-1000">500 - 1000 </option>
      <option value="1000-to-1500">1000 - 1500 </option>
      <option value="1500-to-2000">1500 - 2000 </option>
      <option value="2000-to-2500">2000 - 2500 </option>
      <option value="2500-to-3000">2500 - 3000 </option>
      <option value="3000-to-3500">3000 - 3500 </option>
      <option value="3500-to-4000">3500 - 4000 </option>
     </select></p>
     
      </Link>
     </div>
      <br />  <br />

      <div className='allProductsParent'>
       
        {filteredProducts.map((pro) => {
          if (pro.category === "cap") {
            return (
              
                <div key={pro._id} >
                 <Products pro={pro}/>
                </div>
              
            );
          }
        })}
      </div>
     </div>
    </>
  )
}

export default CapProducts
