import React, { useState } from 'react';
import './Playlist.css';


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

const mockRecording = {
  id: 1,
  title: "Audiobook: Red Queen",
  author: "Victoria Aveyard",
  coverUrl: "https://picsum.photos/600/600?random=7"
};

const LibraryList = ({ type = 'books', authorName, header }) => {
  const getItems = () => {
    switch (type) {
      case 'books':
        return mockBooks;
      case 'playlists':
        return [mockRecording];
      default:
        return mockBooks;
    }
  };

  const initialItems = getItems();
  const [items, setItems] = useState(initialItems.map(item => ({ ...item, liked: false })));

  const toggleLike = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, liked: !item.liked } : item
    ));
  };

  const addToPlaylist = (id) => {
    ///// nzwd here later
  };

  const defaultHeader = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="playlist-library">
      <h2 className="playlist-section-title">
        {header || defaultHeader}
      </h2>
      <div className="playlist-list">
        {items.map((item) => (
          <div key={item.id} className="playlist-list-item">
            <div
              className="playlist-list-item-cover"
              style={{
                backgroundImage: `url('${item.coverUrl || item.profilePic}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="playlist-list-info">
              <h3 className="playlist-book-title">{item.title}</h3>
              <p className="playlist-book-author">{item.author}</p>
            </div>
            <div className="playlist-list-actions">
              <button className="playButtonMini"> </button>
              <button
                className={`like-btn ${item.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(item.id)}
                aria-label={item.liked ? "Unlike" : "Like"}
              >
                {item.liked ? '❤️' : '♡'} 
              </button>
              <button
                className="add-to-playlist-btn"
                onClick={() => addToPlaylist(item.id)}
                aria-label="Add to playlist"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryList;