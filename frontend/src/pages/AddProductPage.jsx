import { useState } from "react";
import { adminCreateProduct } from "../api/admin";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image_files: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "image_files" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "image_files") {
        for (let file of value) formData.append("image_files", file);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await adminCreateProduct(formData);
      navigate("/admin");
    } catch (err) {
      console.error("Failed to create product", err);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
        <input name="category_id" type="number" placeholder="Category ID" onChange={handleChange} required />
        <input name="image_files" type="file" multiple onChange={handleChange} />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
