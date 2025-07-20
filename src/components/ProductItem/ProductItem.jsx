import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./productItem.css";
import { Link } from 'react-router-dom';

const ProductItem = ({ productId, title, image, price, currency }) => {


     return (
          <>
               <Link to={`/product/${productId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                    <div className="product-details card">
                         <div className="imgBox">
                              <img src={image} alt="no img" />
                         </div>
                         <p className="namePara text-center mb-0"> <b> {title}</b></p>
                         <p className="ProductPricePara m-0 text-center">{currency}{price}</p>
                    </div>
               </Link>

          </>
     )
}




export default ProductItem;
