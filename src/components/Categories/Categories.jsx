import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import womenImg from "../../assets copy/women.jpg";
import menImg from "../../assets copy/men.jpg";
import accessoriesImg from "../../assets copy/accessories.jpg";
import "./Categories.css";

const Categories = () => {
  return (
    <div className="category-container container my-5 ">
      <div className="row gx-3">
        <div className="col-lg-4  women-container ">
          <div className="content border">
            <img className="img-fluid" src={womenImg} alt="" />
            <div className="category-text ">
              <h3 >     
                <b>Women</b>
              </h3>
              <p>Spring Season</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4  women-container ">
          <div className="content border">
            <img className="img-fluid" src={menImg} alt="" />
            <div className="category-text">
              <h3 >
                <b>Men</b>
              </h3>
              <p>Spring Season</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4  women-container ">
          <div className="content border">
            <img className="img-fluid" src={accessoriesImg} alt="" />
            <div className="category-text">
              <h3 >
                <b>Accessories</b>
              </h3>
              <p>Spring Season</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
