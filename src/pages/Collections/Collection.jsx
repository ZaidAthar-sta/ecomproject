import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import shopContext from "../../../context/shopContext";
import "./Collection.css";

const Collection = () => {
  const { products, cartItems, updateCart, isAuthenticated, loading } =
    useContext(shopContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [sortOption, setSortOption] = useState("Newest");

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const filtered = products
    .filter((p) =>
      activeTab === "All"
        ? true
        : p.category?.toLowerCase() === activeTab.toLowerCase()
    )
    .filter((p) => {
      if (priceRange === "All") return true;
      const price = p.price;
      if (priceRange === "0-50") return price >= 0 && price <= 50;
      if (priceRange === "50-100") return price > 50 && price <= 100;
      if (priceRange === "100-200") return price > 100 && price <= 200;
      if (priceRange === "200+") return price > 200;
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "PriceLowHigh":
          return a.price - b.price;
        case "PriceHighLow":
          return b.price - a.price;
        case "NameAsc":
          return a.title.localeCompare(b.title);
        case "NameDesc":
          return b.title.localeCompare(a.title);
        case "Newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const handleCart = (id) => {
    if (!isAuthenticated) return navigate("/login");
    const item = cartItems.find((i) => i.product._id === id);
    updateCart(id, item ? item.quantity + 1 : 1);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="collection-container pb-5">
      <h2 className="text-dark pt-5 text-center">Explore Our Collection</h2>
      <p className="text-center text-muted mb-4">
        Discover the latest trends by category
      </p>

      {/* Nav Pills Tabs */}
      <ul className="nav nav-pills justify-content-center mb-4" role="tablist">
        {categories.map((cat, index) => (
          <li className="nav-item" key={index} role="presentation">
            <button
              className={`nav-link pills-link ${
                activeTab === cat ? "active" : ""
              }`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={3} className="mb-2 mb-md-0">
          <Form.Select
            className="filter-dropdown "
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="All">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select
            className="filter-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="PriceLowHigh">Price: Low to High</option>
            <option value="PriceHighLow">Price: High to Low</option>
            <option value="NameAsc">Name: A–Z</option>
            <option value="NameDesc">Name: Z–A</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <h4>No products in "{activeTab}" category.</h4>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filtered.map((p) => (
            <Col key={p._id}>
              <Card className="product-card h-100">
                <div className="image-wrapper position-relative">
                  <Card.Img
                    variant="top"
                    src={p.image || "https://via.placeholder.com/300"}
                    alt={p.name}
                    onClick={() => navigate(`/product/${p._id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  {p.stock <= 0 && (
                    <Badge
                      bg="danger"
                      className="out-of-stock position-absolute top-0 end-0 m-2"
                    >
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {p.description.length > 80
                      ? p.description.slice(0, 80) + "..."
                      : p.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price text-dark">
                      ${p.price.toFixed(2)}
                    </span>
                    <Button
                      className="btn add-to-cart-btn"
                      onClick={() => handleCart(p._id)}
                      disabled={p.stock <= 0}
                    >
                      {p.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Collection;
