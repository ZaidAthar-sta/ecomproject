import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./productItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ productId, title, image, price, currency }) => {
  return (
    <>
      <div className="product-details ">
        <div className="imgBox">
          <img src={image} alt="no img" />
        </div>
        <div className="product-text mt-1 mb-0 p-2">
          <p className="name-para m-0"> {title}</p>
          <p className="Product-price-para m-0">
            {currency}
            {price}
          </p>
          <Link
            to={`/product/${productId}`}
            className="btn viewBtn bg-light px-3"
          >
            Quick View
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
