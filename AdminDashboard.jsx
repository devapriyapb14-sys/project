import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./Admin.css";

const AdminDashboard = () => {
  const [active, setActive] = useState("dashboard");

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <h1 className="heading">
          <strong>Admin Dashboard</strong>
        </h1>

        {active === "dashboard" && (
          <button className="logout" onClick={() => (window.location.href = "/")}>
            Logout
          </button>
        )}
      </div>

      {/* DASHBOARD */}
      {active === "dashboard" && (
        <div className="dashboard">
          <div className="grid">
            <div className="dash-card" onClick={() => setActive("addBook")}>
              <span className="icon">📘</span>
              <p>Add Books</p>
            </div>

            <div className="dash-card" onClick={() => setActive("users")}>
              <span className="icon">👥</span>
              <p>Manage Users</p>
            </div>

            <div className="dash-card" onClick={() => setActive("rentals")}>
              <span className="icon">🛒</span>
              <p>Rental Management</p>
            </div>

            <div className="dash-card" onClick={() => setActive("email")}>
              <span className="icon">📧</span>
              <p>Email Notification</p>
            </div>
          </div>
        </div>
      )}

      {active === "addBook" && <AddBook setActive={setActive} />}
      {active === "users" && <ManageUsers setActive={setActive} />}
      {active === "rentals" && <Rentals setActive={setActive} />}
      {active === "email" && <EmailNotify setActive={setActive} />}
    </>
  );
};

export default AdminDashboard;

/* ================= ADD BOOK ================= */
const AddBook = ({ setActive }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publicationYear: "",
    genre: "",
    isbn: "",
    img: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    try {
      await api.post("/books", form, {
        headers: {
          "x-user": localStorage.getItem("loggedInUser"),
        },
      });
      alert("Book added successfully ✅");
      setActive("dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">Add Book</h2>

      <div className="form-box">
        <input name="title" placeholder="Book Title" onChange={handleChange} />
        <input name="author" placeholder="Author Name" onChange={handleChange} />
        <input name="isbn" placeholder="ISBN Number" onChange={handleChange} />
        <input name="publicationYear" placeholder="Publication Year" onChange={handleChange} />
        <input name="genre" placeholder="Genre" onChange={handleChange} />
        <input name="img" placeholder="Image URL" onChange={handleChange} />
      </div>

      <div className="btn-group">
        <button className="primary" onClick={handleAdd}>Add Book</button>
        <button className="back" onClick={() => setActive("dashboard")}>Back</button>
      </div>
    </div>
  );
};

/* ================= MANAGE USERS ================= */
const ManageUsers = ({ setActive }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users", {
      headers: { "x-user": localStorage.getItem("loggedInUser") },
    }).then(res => setUsers(res.data));
  }, []);

  const toggleBlock = async (id) => {
    await api.put(`/admin/users/${id}/block`, {}, {
      headers: { "x-user": localStorage.getItem("loggedInUser") },
    });

    setUsers(users.map(u =>
      u._id === id ? { ...u, isBlocked: !u.isBlocked } : u
    ));
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`, {
      headers: { "x-user": localStorage.getItem("loggedInUser") },
    });
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="container">
      <h2 className="page-title">Manage Users</h2>

      {users.map((u) => (
        <div key={u._id} className="row">
          <span>{u.name}</span>

          <button onClick={() => toggleBlock(u._id)}>
            {u.isBlocked ? "Unblock" : "Block"}
          </button>

          <button
            style={{ background: "#e74c3c" }}
            onClick={() => deleteUser(u._id)}
          >
            Delete
          </button>
        </div>
      ))}

      <button className="back" onClick={() => setActive("dashboard")}>Back</button>
    </div>
  );
};

/* ================= RENTALS ================= */
const Rentals = ({ setActive }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then(res => setBooks(res.data));
  }, []);

  return (
    <div className="rental-container">
      <h2 className="page-title">Rental Status</h2>

      <div className="table-head">
        <span>Title</span>
        <span>Author</span>
        <span>Status</span>
      </div>

      {books.map((b) => (
        <div key={b._id} className="table-row">
          <span>{b.title}</span>
          <span>{b.author}</span>
          <span className={b.isRented ? "rented" : "available"}>
            {b.isRented ? "Rented" : "Available"}
          </span>
        </div>
      ))}

      <button className="back" onClick={() => setActive("dashboard")}>Back</button>
    </div>
  );
};

/* ================= EMAIL ================= */
const EmailNotify = ({ setActive }) => (
  <div className="container">
    <h2 className="page-title">Email Notification</h2>
    <p>Send reminder emails for overdue books.</p>

    <div className="btn-group">
      <button className="primary">Send Emails</button>
      <button className="back" onClick={() => setActive("dashboard")}>Back</button>
    </div>
  </div>
);
