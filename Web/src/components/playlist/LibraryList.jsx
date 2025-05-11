import React, { useState, useEffect } from 'react';
import './Playlist.css';
import playButtonImage from '../../assets/min-play.png';
import { HiOutlineDownload } from 'react-icons/hi';
import { toggleFavorite, isFavorited } from '../../api/favoriteAPI';
import { useAuth } from '../../Context';
import { useBook } from './BookContext';
import sample from '../../../public/sample.mp3';




const LibraryList = ({ type = 'books', authorName, header, book, books = [] }) => {
  const { handlePlayBook, selectedBookId } = useBook();

  console.log('LibraryList BookContext:', { handlePlayBook, selectedBookId }); 

const getItems = () => {
  if (books.length > 0) return books;
  if (book) return [book];
  return [];
};
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

  const initialItems = getItems();
  const [items, setItems] = useState(
    initialItems.map((item) => ({ ...item, liked: false }))
  );

  console.log('LibraryList Items:', items);
  useEffect(() => {
    checkFavoriteStatus();
  }, [book, user]);

  const handleLikeClick = async () => {
    if (!user || !book?.id) {
      console.log('User not logged in or missing book id');
      return;
    }

    try {
      await toggleFavorite(user.id, book.id);
      checkFavoriteStatus();
    } catch (error) {
      console.error('Error toggling favorite', error);
    }
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

  const handlePlay = (bookId) => {
    console.log('handlePlay received bookId:', bookId); 
    if (handlePlayBook) {
      handlePlayBook(bookId);
    } else {
      console.error('handlePlayBook is not WORKINGF JEewfFIJWEFNOWEIFF');
    }

    const playButton = document.querySelector('#audio-player-container #play-icon');
    if (playButton) {
      playButton.click();
    }
    
  };

  const defaultHeader = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="playlist-library">
      <h2 className="playlist-section-title">{header || defaultHeader}</h2>
      <div className="playlist-list">
        <div className="playlist-list-item">
          <div
            className="playlist-list-item-cover"
            style={{
              backgroundImage: `url('${book.cover}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="playlist-list-info">
            <h3 className="playlist-book-title">{book.title}</h3>
            <p className="playlist-book-author">{book.author}</p>
          </div>
          <div className="playlist-list-actions">
            <button
              className="playButtonMini"
              style={{ backgroundImage: `url(${playButtonImage})` }}
              onClick={() => handlePlay(item.id)}
              aria-label="Play audiobook"
            />  
              <button className={`book-view-thing-${isLiked ? 'liked' : 'not-liked'}-icon`} onClick={handleLikeClick}/>
            <div className="download-btn" onClick={() => downloadBook(book.id)} aria-label="Download Book Offline">
              <HiOutlineDownload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
}

export default LibraryList;