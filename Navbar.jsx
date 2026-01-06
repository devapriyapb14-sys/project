import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand" href="#">📚 MyBookStore</a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Books</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">My Profile</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Admin Dashboard</a>
          </li>
        </ul>

        <div className="d-flex">
          <button className="btn btn-outline-light me-2">Login</button>
          <button className="btn btn-primary me-2">Sign Up</button>
          <button className="btn btn-danger">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;