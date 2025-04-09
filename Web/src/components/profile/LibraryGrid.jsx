import React from 'react';

// Mock data for testing - 9 items.. this is chatgpt data will be removed once we integrate the db
const mockBooks = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://picsum.photos/600/600?random=1"
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://picsum.photos/600/600?random=2"
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://picsum.photos/600/600?random=3"
  }
];

// Mock data for Playlists
const mockPlaylists = [
  {
    id: 4,
    title: "Classic Literature",
    author: "Book Lover",
    coverUrl: "https://picsum.photos/600/600?random=4"
  },
  {
    id: 5,
    title: "Summer Reads",
    author: "Beach Reader",
    coverUrl: "https://picsum.photos/600/600?random=5"
  },
  {
    id: 6,
    title: "Mystery Collection",
    author: "Detective Fan",
    coverUrl: "https://picsum.photos/600/600?random=6"
  }
];

// Mock data for Recommendations
const mockRecommendations = [
  {
    id: 7,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    coverUrl: "https://picsum.photos/600/600?random=7"
  },
  {
    id: 8,
    title: "The Da Vinci Code",
    author: "Dan Brown",
    coverUrl: "https://picsum.photos/600/600?random=8"
  },
  {
    id: 9,
    title: "The Alchemist",
    author: "Paulo Coelho",
    coverUrl: "https://picsum.photos/600/600?random=9"
  }
];

const LibraryGrid = ({ type = 'books', authorName }) => {
  const getItems = () => {
    switch (type) {
      case 'books':
        return mockBooks;
      case 'playlists':
        return mockPlaylists;
      case 'recommendations':
        return mockRecommendations;
      default:
        return mockBooks;
    }
  };

  const items = getItems();

  return (
    <div className="author-profile-library">
      <h2 className="author-profile-section-title">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
      <div className="author-profile-grid">
        {items.map((item) => (
          <div key={item.id} className="author-profile-grid-item">
            <div className="author-profile-book-cover"
              style={{
                backgroundImage: `url('${item.coverUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="author-profile-book-info">
              <h3 className="author-profile-book-title">{item.title}</h3>
              <p className="author-profile-book-author">{authorName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryGrid;