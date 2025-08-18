import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminUpdateProduct, adminGetProducts } from "../api/admin";
import "./AdminDashboard.css";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    adminGetProducts().then((res) => {
      const product = res.data.find((p) => p.id === parseInt(id));
      if (product) {
        setForm({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category_id: product.category.id,
          image_files: [],
        });
      }
    });
  }, [id]);

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
      await adminUpdateProduct(id, formData);
      navigate("/admin");
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="name" value={form.name} onChange={handleChange} required />
        <textarea name="description" value={form.description} onChange={handleChange} />
        <input name="price" type="number" value={form.price} onChange={handleChange} required />
        <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
        <input name="category_id" type="number" value={form.category_id} onChange={handleChange} required />
        <input name="image_files" type="file" multiple onChange={handleChange} />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}
