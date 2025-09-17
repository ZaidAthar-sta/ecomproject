import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import shopContext from "../../../context/shopContext";
import axios from "axios";

const AdminDashboard = () => {
  const { backendURL, token } = useContext(shopContext);
  const [counts, setCounts] = useState({
    users: 0,
    products: 0,
    orders: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/user/dashboard-counts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCounts(response.data.data);
      } else {
        console.error("Error fetching dashboard counts", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard counts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="admin-dashboard py-4">
      <Container fluid>
        <Row className="mb-4">
          <Col md={4}>
            <Card className="summary-card text-center">
              <Card.Body className="py-4">
                <Card.Title>Total Users</Card.Title>
                <h3>{counts.users}</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Link to={"/collection"} className="product-link">
              <Card className="summary-card text-center">
                <Card.Body className="py-4">
                  <Card.Title>Total Products</Card.Title>
                  <h3>{counts.products}</h3>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={4}>
            <Card className="summary-card text-center">
              <Card.Body className="py-4">
                <Card.Title>Total Orders</Card.Title>
                <h3>{counts.orders}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="p-4">
              <h5 className="mb-3">Recent Activity</h5>
              <p>
                This area can be used to show recent orders, logs, or admin
                actions.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
