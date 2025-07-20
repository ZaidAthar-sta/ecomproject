import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './AdminDashboard.css'
import { Container, Row, Col, Card } from 'react-bootstrap'

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard py-4">
      <Container fluid>
        <h2 className="mb-4 text-center">Welcome, Admin!</h2>

        {/* Summary Cards */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="summary-card text-center">
              <Card.Body>
                <Card.Title>Total Users</Card.Title>
                <h3>128</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="summary-card text-center">
              <Card.Body>
                <Card.Title>Total Products</Card.Title>
                <h3>45</h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="summary-card text-center">
              <Card.Body>
                <Card.Title>Total Orders</Card.Title>
                <h3>223</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Future Section: Add Charts or Tables */}
        <Row>
          <Col>
            <Card className="p-4">
              <h5 className="mb-3">Recent Activity</h5>
              <p>This area can be used to show recent orders, logs, or admin actions.</p>
              {/* You can plug in a table, chart, or list here */}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AdminDashboard
