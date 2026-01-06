// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

const predefinedAdmin = {
  email: "admin@library.com",
  password: "Admin@123",
  name: "Admin",
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ADMIN LOGIN (no API)
    if (
      email === predefinedAdmin.email &&
      password === predefinedAdmin.password
    ) {
      const adminData = {
        role: "admin",
        name: predefinedAdmin.name,
        email: predefinedAdmin.email,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(adminData));
      navigate("/admindashboard", { state: adminData });
      return;
    }

    // USER LOGIN (API)
    try {
      const res = await api.post("/login", { email, password });

      const userData = {
        role: res.data.user.role,
        name: res.data.user.name,
        email: res.data.user.email,
      };

      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      navigate("/home", { state: userData });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <div className="auth-left">
          <h2>Continue Your Learning Journey!</h2>
          <p>Login to access your dashboard</p>
          <img
            src="https://i.pinimg.com/736x/af/f2/8a/aff28acbd67bef1684bc93010f962db9.jpg"
            alt="login"
          />
        </div>

        <div className="auth-right">
          <h1><strong>Login</strong></h1>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Login</button>

            <p className="switch">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;


