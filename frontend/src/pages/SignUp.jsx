import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
      return;
    }

    try {
      await registerUser(formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "10px auto",
        padding: "2rem",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Create an Account
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="password2"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: "center", color: "#555" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Log In
        </Link>
      </p>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "1rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#007bff",
  border: "none",
  borderRadius: "4px",
  color: "white",
  fontSize: "1rem",
  cursor: "pointer",
  marginBottom: "1rem",
};

export default Signup;
