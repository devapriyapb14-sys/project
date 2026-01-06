// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    place: "",
    email: "",
    phone: "",
    education: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("You must accept the terms and conditions");
      return;
    }

    try {
      const res = await api.post("/signup", {
        name: formData.name,
        age: formData.age,
        place: formData.place,
        email: formData.email,
        phone: formData.phone,
        education: formData.education,
        password: formData.password,
      });

      alert(res.data.message || "Signup successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card large">

        <div className="auth-left">
          <h1 className="signup-title"><strong>SignUp</strong></h1>
          <h2>Continue Your Learning Journey!</h2>
          <p>Signup to access your dashboard</p>
          <img
            src="https://i.pinimg.com/736x/af/f2/8a/aff28acbd67bef1684bc93010f962db9.jpg"
            alt="signup"
          />
        </div>

        <div className="auth-right full">
          <form onSubmit={handleSubmit}>

            <input name="name" placeholder="Name" onChange={handleChange} required />
            <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
            <input name="place" placeholder="Place" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            <input name="education" placeholder="Education" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

            <div className="terms">
              <input type="checkbox" name="terms" onChange={handleChange} />
              <label>
                <b>I accept if late returns or damaged books subjected to fine</b>
              </label>
            </div>

            <button type="submit">Sign Up</button>

            <p className="switch">
              Already have an account? <Link to="/">Login</Link>
            </p>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Signup;