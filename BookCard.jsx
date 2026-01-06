import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="card p-3 shadow-sm">
      <h5>{book.title}</h5>
      <p className="text-muted mb-1">Author: {book.author}</p>
      <button className="btn btn-primary btn-sm">View Details</button>
    </div>
  );
};

export default BookCard;