import React, { useState } from 'react';
import './Playlist.css';
import playButtonImage from '../../assets/min-play.png';
import { HiOutlineDownload } from 'react-icons/hi';
import { useBook } from './BookContext';
import sample from '../../../public/sample.mp3';

<<<<<<< HEAD
const LibraryList = ({ type = 'books', authorName, header, book }) => {
  const { user } = useAuth();
  const [isLiked, setisLiked] = useState(false);
  const checkFavoriteStatus = async () => {
    if (!user || !book?.id) return;
    
    try {
      const favorited = await isFavorited(user.id, book.id);
      setisLiked(favorited);
    } catch (error) {
      console.error(error);
      setisLiked(false);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [book, user]);
=======
const LibraryList = ({ type = 'books', authorName, header, book, books = [] }) => {
  const { handlePlayBook, selectedBookId } = useBook();

  console.log('LibraryList BookContext:', { handlePlayBook, selectedBookId }); 

const getItems = () => {
  if (books.length > 0) return books;
  if (book) return [book];
  return [];
};

  const initialItems = getItems();
  const [items, setItems] = useState(
    initialItems.map((item) => ({ ...item, liked: false }))
  );

  console.log('LibraryList Items:', items);
>>>>>>> parent of be6c1ec (Merge branch 'main' of https://github.com/MohanedAtef238/Web_Project)

  const toggleLike = (id) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, liked: !item.liked } : item))
    );
  };

  const downloadBook = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active.postMessage({
          type: 'CACHE_AUDIO',
          url: sample,
        });
      });
    }
  };

  
  const handlePlay = () => {
    const playButton = document.querySelector('#audio-player-container #play-icon');
    if (playButton) {
      playButton.click();
    }
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
                backgroundImage: `url('${item.coverUrl || item.cover || item.profilePic}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="playlist-list-info">
              <h3 className="playlist-book-title">{item.title}</h3>
              <p className="playlist-book-author">{item.author}</p>
            </div>
            <div className="playlist-list-actions">
              <button
                className={`playButtonMini ${selectedBookId === item.id ? 'playing' : ''}`}
                style={{ backgroundImage: `url(${playButtonImage})` }}
                onClick={() => handlePlay(item.id)}
                aria-label="Play audiobook"
              ></button>
              <button
                className={`like-btn ${item.liked ? 'liked' : ''}`}
                onClick={() => toggleLike(item.id)}
                aria-label={item.liked ? 'Unlike' : 'Like'}
              >
                {item.liked ? '❤️' : '♡'}
              </button>
              <div
                className="download-btn"
                onClick={() => downloadBook(item.id)}
                aria-label="Download Book Offline"
              >
                <HiOutlineDownload />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryList;









