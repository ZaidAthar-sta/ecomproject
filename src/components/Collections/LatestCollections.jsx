import React, { useContext, useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./LatestCollections.css";
import shopContext from '../../../context/shopContext';
import ProductItem from '../ProductItem/ProductItem';

const LatestCollections = () => {
  const { products, currency } = useContext(shopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Show latest 10 products, sorted by createdAt (if available)
    const sortedProducts = [...products].sort((a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    setLatestProducts(sortedProducts.slice(0, 10));
  }, [products]);

  return (
    <section className="latest-collections my-5 py-5">
      <div className="container text-center">
        <h3 className="section-title mb-3">Latest Collections</h3>
        <p className="section-description text-muted mb-4">
          Explore our newest additions — curated with care and crafted for quality.
        </p>

        <div className="item-wrapper row">
          {latestProducts.length === 0 ? (
            <p className="text-muted">No products available at the moment.</p>
          ) : (
            latestProducts.map((product) => (
              <div className="col-md-4 col-lg-3 mb-4" key={product._id}>
                <ProductItem
                  productId={product._id}
                  image={product.image?.[0] || "https://via.placeholder.com/300"}
                  title={product.title}
                  price={product.price}
                  currency={currency}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestCollections;
