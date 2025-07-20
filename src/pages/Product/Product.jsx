import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Spinner, Container, Row, Col, Button, Badge } from 'react-bootstrap'
import shopContext from '../../../context/shopContext'
import './Product.css'

const Product = () => {
  const { backendURL, token, isAuthenticated, currency } = useContext(shopContext)
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.post(`${backendURL}/api/product/single`, { productId })
        if (res.data.success) {
          setProduct(res.data.message)
        } else {
          toast.error(res.data.message || "Failed to load product")
        }
      } catch (err) {
        console.error(err)
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, backendURL])

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.warning("Please login to add items to cart.")
      return
    }

    try {
      const res = await axios.post(`${backendURL}/api/cart/add`, {
        productId: product._id,
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (res.data.success) {
        toast.success("Added to cart!")
      } else {
        toast.error(res.data.message || "Unable to add to cart.")
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status" />
      </Container>
    )
  }

  if (!product) {
    return (
      <Container className="text-center py-5">
        <h4>Product not found.</h4>
      </Container>
    )
  }

  return (
    <Container className="product-detail my-5">
      <Row className="align-items-center">
        <Col md={6} className="text-center">
          <div className="image-container">
            <img
              src={product.image || 'https://via.placeholder.com/500'}
              alt={product.title}
              className="img-fluid rounded shadow"
            />
            {product.stock <= 0 && (
              <Badge bg="danger" className="out-of-stock">Out of Stock</Badge>
            )}
          </div>
        </Col>
        <Col md={6} className='product-description' >
          <h2>{product.title}</h2>
          <h4 className="text-success mt-2 ">{currency} {product.price.toFixed(2)}</h4>
          <p className="text-muted">Category: {product.category}</p>
          <p>{product.description}</p>
          <Button
            variant="primary"
            className="mt-3"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Product
