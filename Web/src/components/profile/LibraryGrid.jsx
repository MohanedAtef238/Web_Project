import React from 'react';

// Mock data for testing - 9 items.. this is chatgpt data will be removed once we integrate the db
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://picsum.photos/400/400?random=1"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://picsum.photos/400/400?random=2"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://picsum.photos/400/400?random=3"
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverUrl: "https://picsum.photos/400/400?random=4"
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    coverUrl: "https://picsum.photos/400/400?random=5"
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl: "https://picsum.photos/400/400?random=6"
  },
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    coverUrl: "https://picsum.photos/400/400?random=7"
  },
  {
    id: 8,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverUrl: "https://picsum.photos/400/400?random=8"
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverUrl: "https://picsum.photos/400/400?random=9"
  }
];

const LibraryGrid = ({ books = mockBooks, authorName }) => {
  return (
    <div className="author-profile-library">
      <div className="author-profile-grid">
        {books.map((book) => (
          <div key={book.id} className="author-profile-grid-item">
            <div 
              className="author-profile-book-cover"
              style={{
                backgroundImage: `url('${book.coverUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="author-profile-book-info">
              <h3 className="author-profile-book-title">{book.title}</h3>
              <p className="author-profile-book-author">{authorName || book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryGrid;