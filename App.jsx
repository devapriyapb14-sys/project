import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages from "Pages" with capital P
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminDashboard from "./Pages/AdminDashboard";
import BooksDetails from "./Pages/BooksDetails";
import Books from "./Pages/Books";
import Profile from "./Pages/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/book/:id" element={<BooksDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
