// src/pages/BooksDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./BooksDetails.css";

const BooksDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isRented, setIsRented] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔗 Fetch single book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
        setIsRented(res.data.isRented || false);
      } catch (err) {
        console.error("Book fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading book...</p>;
  }

  if (!book) {
    return (
      <div className="page">
        <Link to="/home">⬅ Back to Home</Link>
        <h2>Book not found</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <Link className="back-link" to="/home">⬅ Back to Home</Link>

      <h1 className="title">{book.title}</h1>

      <div className="book-box">
        <img src={book.img} alt={book.title} className="book-img" />

        <div className="book-info">
          <p><b>ID:</b> {book._id}</p>
          <p><b>Author:</b> {book.author}</p>
          <p><b>Publication Year:</b> {book.publicationYear || "N/A"}</p>
          <p><b>Genre:</b> {book.genre || "N/A"}</p>
          <p><b>ISBN:</b> {book.isbn}</p>
          <p><b>Price:</b> ₹{book.price ? Math.round(book.price * 83) : "N/A"}</p>
        </div>
      </div>

      {/* PREV / NEXT – optional (static removed safely) */}
      <div className="nav-btns">
        <button disabled>◀ Previous</button>
        <button disabled>Next ▶</button>
      </div>

      <div className="bottom-boxes">

        {/* RENT */}
        <div className="small-box">
          <h4>Status</h4>
          <p className={isRented ? "rented" : "available"}>
            {isRented ? "Rented" : "Available"}
          </p>
          <button onClick={() => setIsRented(!isRented)}>
            {isRented ? "Return" : "Rent"}
          </button>
        </div>

        {/* LIKE */}
        <div className="small-box">
          <h4>Like</h4>
          <button onClick={() => setLiked(!liked)}>
            {liked ? "❤️ Liked" : "🤍 Like"}
          </button>
        </div>

        {/* COMMENTS (local only) */}
        <div className="small-box">
          <h4>Comments</h4>
          <textarea
            rows="2"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={() => {
              if (newComment.trim()) {
                setComments([...comments, newComment]);
                setNewComment("");
              }
            }}
          >
            Add
          </button>

          <ul>
            {comments.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default BooksDetails;
