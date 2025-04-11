import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './BookView.css';
import LibraryList from '../playlist/LibraryList';

const Book = () => {
  const { title } = useParams(); 
  const location = useLocation(); 
  const book = location.state?.book;

  const [likedCount, setLikedCount] = useState(10000);
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthorBooks, setIsAuthorBooks] = useState(true);
  const [bookData, setBookData] = useState({
      BookCoverImage: book?.cover || 'https://picsum.photos/200/300',
      description: book?.description || 'No description available.',
      author: book?.author || 'Unknown Author',
  });

  const [comments, setComments] = useState([
    { id: 1, text: "Great book!", user: "Reader1", date: "2025-04-08" },
    { id: 2, text: "Really enjoyed the plot", user: "BookLover", date: "2025-04-09" }
  ]);

  let likedButtonClass = 'book-not-liked-btn';
  if (isLiked) {
    likedButtonClass += ' book-not-liked-btn--liked';
  }

  let ButtonText = 'Like';
  if (isLiked) {
    ButtonText = 'Liked';
  }

  return (
    <div className="book-wrapper">
      <div className="book-container">
        <div className="book-profile">
        <div className="book-header">
        <div className="book-header-content">
            <img
            src={bookData.BookCoverImage}
            alt={`${title} cover`}
            className="book-cover"
            />
            <div className="book-info">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{bookData.author}</p>
            <p className="book-description">{bookData.description}</p>
            {/* <p className="book-liked-count">
                {likedCount.toLocaleString()} Likes
            </p> */}
            {/* <div className="book-actions">
                <button
                className={likedButtonClass}
                onClick={() => setIsLiked(!isLiked)}
                >
                {ButtonText}
                </button>
            </div> */}
            </div>
        </div>
        </div>
          </div>
        </div>

        <div className="book-content">
          <LibraryList
            type="playlists"
            title={title}
            header={'Listen Now'}
            book={book}
          />
        </div>

        <div className="comments-section">
          <h3 className="readers-say">What Other Readers Say</h3>

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-box-thing ">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>

          <form className="comment-form">
            <textarea
              placeholder="Add your comment..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    
  );
};

export default Book;