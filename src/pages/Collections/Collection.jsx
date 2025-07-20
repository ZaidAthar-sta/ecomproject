import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Spinner, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import shopContext from '../../../context/shopContext'
import './Collection.css'

const Collection = () => {
  const { products, cartItems, updateCart, isAuthenticated, loading } = useContext(shopContext)
  const navigate = useNavigate()

  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [price, setPrice] = useState('all')
  const [sort, setSort] = useState('default')

  const categories = ['all', ...new Set(products.map(p => p.category))]

  useEffect(() => {
    let result = [...products]

    if (category !== 'all') {
      result = result.filter(p => p.category === category)
    }

    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number)
      result = result.filter(p => p.price >= min && (!max || p.price <= max))
    }

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break
      default: result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFiltered(result)
  }, [products, category, price, search, sort])

  const handleCart = (id) => {
    if (!isAuthenticated) return navigate('/login')
    const item = cartItems.find(i => i.product._id === id)
    updateCart(id, item ? item.quantity + 1 : 1)
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
      </Container>
    )
  }

  return (
    <Container className="collection-container py-5">
      <h2 className="text-center mb-4">Explore Our Collection</h2>

      {/* Filters */}
      <div className="filters-section p-3 mb-4 bg-light rounded">
        <Row>
          <Col md={3}>
            <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={price} onChange={e => setPrice(e.target.value)}>
              <option value="all">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-200">$100 - $200</option>
              <option value="200-">$200+</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
        </Row>
      </div>

      {/* Product Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-5">
          <h4>No products match your criteria.</h4>
          <Button variant="outline-secondary" onClick={() => {
            setCategory('all')
            setPrice('all')
            setSort('default')
            setSearch('')
          }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filtered.map(p => (
            <Col key={p._id}>
              <Card className="product-card h-100">
                <div className="image-wrapper">
                  <Card.Img
                    variant="top"
                    src={p.image || 'https://via.placeholder.com/300'}
                    alt={p.name}
                    onClick={() => navigate(`/product/${p._id}`)}
                    style={{ cursor: 'pointer' }}
                  />
                  {p.stock <= 0 && (
                    <Badge bg="danger" className="out-of-stock">Out of Stock</Badge>
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {p.description.length > 80 ? p.description.slice(0, 80) + '...' : p.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price text-success">${p.price.toFixed(2)}</span>
                    <Button
                      className='btn-success'
                      variant="primary"
                      onClick={() => handleCart(p._id)}
                      disabled={p.stock <= 0}
                    >
                      {p.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Collection
