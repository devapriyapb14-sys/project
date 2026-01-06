import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";        // 👈 common axios
import "./HomePage.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔗 Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books"); // GET /api/books
        setBooks(res.data);
      } catch (err) {
        setError("Failed to load books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const toggleLike = (bookId) => {
    setLikedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading books...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;

  return (
    <div className="home-container">
      <h1 className="main-heading">
        <strong>📚 All Books</strong>
      </h1>

      <Link to="/home" style={{ marginBottom: "20px", display: "inline-block" }}>
        ⬅ Back to Home
      </Link>

      <div className="pinterest-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            <button
              className="like-btn"
              onClick={() => toggleLike(book._id)}
            >
              {likedBooks.includes(book._id) ? "❤️" : "🤍"}
            </button>

            <Link to={`/book/${book._id}`} state={{ bookId: book._id }}>
              <img src={book.img} alt={book.title} />
              <h4>{book.title}</h4>
            </Link>

            <button className="view-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
