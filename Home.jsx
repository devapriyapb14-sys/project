import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./HomePage.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedBooks, setLikedBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const allBooks = {
    "Science Fiction": [
      { id: 1, title: "Dune", img: "https://covers.openlibrary.org/b/id/15092781-M.jpg" },
      { id: 2, title: "Project Hail Mary", img: "https://covers.openlibrary.org/b/id/14837125-M.jpg" },
      { id: 3, title: "Frankenstein", img: "https://covers.openlibrary.org/b/id/12752093-M.jpg" },
      { id: 4, title: "Red Rising", img: "https://covers.openlibrary.org/b/id/15134076-M.jpg" },
      { id: 5, title: "The Martian", img: "https://covers.openlibrary.org/b/id/14641755-M.jpg" },
    ],
    Romance: [
      { id: 6, title: "The Twisted Throne", img: "https://images-na.ssl-images-amazon.com/images/P/0593975308.01._SX50_SCLZZZZZZZ_.jpg" },
      { id: 7, title: "First-Time Caller", img: "https://covers.openlibrary.org/b/id/14840886-M.jpg" },
      { id: 8, title: "When I Think Of You", img: "https://covers.openlibrary.org/b/id/14611544-M.jpg" },
      { id: 9, title: "Romeo and Juliet", img: "https://covers.openlibrary.org/b/id/14793893-M.jpg" },
      { id: 10, title: "A Little Fate", img: "https://covers.openlibrary.org/b/id/11563847-M.jpg" },
    ],
    Thriller: [
      { id: 11, title: "Gone Girl", img: "https://covers.openlibrary.org/b/id/12498395-M.jpg" },
      { id: 12, title: "Conclave", img: "https://covers.openlibrary.org/b/id/14919517-M.jpg" },
      { id: 13, title: "The Girl With The Dragon Tattoo", img: "https://covers.openlibrary.org/b/id/15145260-M.jpg" },
      { id: 14, title: "The Woman In The Window", img: "https://covers.openlibrary.org/b/id/12379672-M.jpg" },
      { id: 15, title: "The Silent Wife", img: "https://covers.openlibrary.org/b/id/14833534-M.jpg" },
    ],
    Horror: [
      { id: 16, title: "The Haunting Of Hill House", img: "https://covers.openlibrary.org/b/id/12684825-M.jpg" },
      { id: 17, title: "The King In The Yellow", img: "https://covers.openlibrary.org/b/id/14996498-M.jpg" },
      { id: 18, title: "Bird Box", img: "https://covers.openlibrary.org/b/id/11377399-M.jpg" },
      { id: 19, title: "The Shining", img: "https://covers.openlibrary.org/b/id/15090478-M.jpg" },
      { id: 20, title: "Ghost Of The Silent Hills", img: "https://covers.openlibrary.org/b/id/15112734-M.jpg" },
    ],
  };

  const toggleLike = (bookId) => {
    setLikedBooks((prev) =>
      prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );
  };

  const filterBooks = () => {
    let books = Object.values(allBooks).flat();
    if (activeCategory !== "All") books = allBooks[activeCategory];
    if (searchTerm) {
      books = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return books;
  };

  const categories = ["All", ...Object.keys(allBooks)];

  return (
    
    <div className="home-container">
      {/* Navbar */}
      <h1 className="book"><strong>📚 BOOKHIVE</strong>
        </h1>
      <nav className="navbar">
        <div className="logo"></div>
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/books">Books</Link>
          <Link to="/login">Logout</Link>
        </div>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </nav>

      

      {/* Category Tabs */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === activeCategory ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Book Grid */}
      <div className="pinterest-grid">
        {filterBooks().map((book) => (
          <div key={book.id} className="book-card">
            <button className="like-btn" onClick={() => toggleLike(book.id)}>
              {likedBooks.includes(book.id) ? "❤️" : "🤍"}
            </button>
            <Link to={`/book/${book.id}`} state={{ bookId: book.id }}>
              {book.img && <img src={book.img} alt={book.title} />}
              <h4>{book.title}</h4>
            </Link>
           
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Join the BOOKHIVE Community</h2>
        <p>To get personalized book recommendations!</p>
      
      </section>

      
    </div>
  );
};

export default Home;

