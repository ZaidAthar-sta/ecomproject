import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./LatestCollections.css";
import shopContext from "../../../context/shopContext";
import ProductItem from "../ProductItem/ProductItem";

const LatestCollections = () => {
  const { products, currency } = useContext(shopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setLatestProducts(sortedProducts.slice(0, 30)); // get top 30 for all tabs
  }, [products]);

  // Filter products by category
  const getProductsByCategory = (category) =>
    latestProducts.filter(
      (product) => product.category?.toLowerCase() === category.toLowerCase()
    );

  // Shared render function
  const renderProductGrid = (category) => {
    const filtered = getProductsByCategory(category);
    if (filtered.length === 0) {
      return <p className="text-muted">No products available in {category}.</p>;
    }

    return (
      <div className="item-wrapper row">
        {filtered.map((product) => (
          <div className="col-md-4 col-lg-3 mb-4" key={product._id}>
            <ProductItem
              productId={product._id}
              image={product.image?.[0] || "https://via.placeholder.com/300"}
              title={product.title}
              price={product.price}
              currency={currency}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="latest-collections mb-5 py-5">
      <div className="container">
        <h3 className="section-title mb-3">Latest Collections</h3>
        <p className="section-description mb-4">
          Explore our newest additions — curated with care and crafted for
          quality.
        </p>

        <ul className="nav nav-pills " id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link pills-link active"
              id="pills-shuttle-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-shuttle"
              type="button"
              role="tab"
              aria-controls="pills-shuttle"
              aria-selected="true"
            >
              Men
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link pills-link"
              id="pills-fancy-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-fancy"
              type="button"
              role="tab"
              aria-controls="pills-fancy"
              aria-selected="false"
            >
              Women
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="nav-link pills-link"
              id="pills-patches-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-patches"
              type="button"
              role="tab"
              aria-controls="pills-patches"
              aria-selected="false"
            >
              Bags
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link pills-link active"
              id="pills-shuttle-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-shuttle"
              type="button"
              role="tab"
              aria-controls="pills-shuttle"
              aria-selected="true"
            >
              Shoes
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link pills-link"
              id="pills-fancy-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-fancy"
              type="button"
              role="tab"
              aria-controls="pills-fancy"
              aria-selected="false"
            >
              Watches
            </button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-shuttle"
            role="tabpanel"
            aria-labelledby="pills-shuttle-tab"
          >
            {renderProductGrid("Shuttle Lace")}
          </div>

          <div
            className="tab-pane fade"
            id="pills-fancy"
            role="tabpanel"
            aria-labelledby="pills-fancy-tab"
          >
            {renderProductGrid("Fancy Lace")}
          </div>

          <div
            className="tab-pane fade"
            id="pills-patches"
            role="tabpanel"
            aria-labelledby="pills-patches-tab"
          >
            {renderProductGrid("Patches")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestCollections;
