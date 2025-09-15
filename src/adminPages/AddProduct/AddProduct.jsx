  import React, { useState, useContext } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import "./AddProduct.css";
  import { toast } from "react-toastify";
  import axios from "axios";
  import shopContext from "../../../context/shopContext";
  import uploadArea from "../../assets copy/upload_area.png";

  const AddProduct = () => {
    const { backendURL, token } = useContext(shopContext);

    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        image1 && formData.append("image1", image1);
        image2 && formData.append("image2", image2);
        image3 && formData.append("image3", image3);
        image4 && formData.append("image4", image4);

        const response = await axios.post(
          `${backendURL}/api/product/add`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setTitle("");
          setDescription("");
          setCategory("");
          setPrice("");
          setImage1("");
          setImage2("");
          setImage3("");
          setImage4("");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    const renderImageInput = (img, setter, id) => (
      <>
        <label htmlFor={id}>
          <img src={!img ? uploadArea : URL.createObjectURL(img)} alt="upload" />
        </label>
        <input
          type="file"
          id={id}
          hidden
          onChange={(e) => setter(e.target.files[0])}
        />
      </>
    );

    return (
      <div className="container my-5">
        <h2 className="text-dark mb-4">Add New Product</h2>
        <form
          onSubmit={onSubmitHandler}
          className="p-4 shadow-sm rounded bg-white"
        >
          <div className="mb-4">
            <h5 className="mb-2">Upload Images</h5>
            <div className="d-flex flex-wrap gap-3 uploadImgContainer">
              {renderImageInput(image1, setImage1, "image1")}
              {renderImageInput(image2, setImage2, "image2")}
              {renderImageInput(image3, setImage3, "image3")}
              {renderImageInput(image4, setImage4, "image4")}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Product Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="20"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type here"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Product Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Write content here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <button type="submit" className="btn add-btn px-5">
              Add Product
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default AddProduct;
