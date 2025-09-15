import React, { useContext, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import shopContext from '../../../context/shopContext'
import { toast } from 'react-toastify'
import "./AllProduct.css"

const AllProducts = () => {
  const { backendURL, token } = useContext(shopContext)
  const [list, setList] = useState([])

  const getAllProducts = async () => {
    try {
      const response = await axios.get(backendURL + "/api/product/list")
      if (response.data.success) {
        setList(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Error fetching products")
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendURL + "/api/product/remove",
        { id },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success(response.data.message)
        getAllProducts()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <div className="container py-5">
      <h2 className="text-dark p-3 mb-4">All Products</h2>
      <div className="row">
        {list.length === 0 ? (
          <div className="col-12 text-center">
            <p>No products found.</p>
          </div>
        ) : (
          list.map((product, index) => (
            <div key={index} className="col-md-6 col-lg-3 mb-4">
              <div className="card product-card-admin h-100 shadow-sm">
                <div className="admin-img-container">
                  <img
                    src={product.image || "https://via.placeholder.com/300x200"}
                    alt={product.name}
                    className="card-img-top"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted small">
                    {product.description?.length > 100
                      ? product.description.slice(0, 100) + "..."
                      : product.description}
                  </p>
                  <p className="fw-semibold mt-0 text-dark">Rs. {product.price}</p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeProduct(product._id)}
                    >
                      Delete
                    </button>
                    <button className="btn btn-outline-success">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AllProducts
