import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from 'react-router-dom';
import './BookView.css';
import LibraryList from '../playlist/LibraryList';
import { addReview, getReviews } from '../../api/reviewAPI';
import { useAuth } from '../../Context';
import { addInteractions } from '../../api/recommendationAPI';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: rating >= star ? 'gold' : 'gray',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const Book = () => {
  const { title } = useParams();
  const location = useLocation();
  const book = location.state?.book;  // Ensure the book is passed through location state.

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();

  // This state holds book data like description and author
  const [bookData, setBookData] = useState({
    BookCoverImage: book?.cover || 'https://picsum.photos/200/300',
    description: book?.description || 'No description available.',
    author: book?.author || 'Unknown Author',
  });

  // Fetch reviews for the specific book
  useEffect(() => {
    if (book && book.id) {
      async function get_Reviews() {
        try {
          const fetchedReviews = await getReviews(book.id);
          setReviews(fetchedReviews);
        } catch (error) {
          console.error("Fetching reviews error: ", error);
        }
      }
      get_Reviews();
    }
  }, [book?.id]);  // Run only when the book's id changes

  // Handle adding a review
  async function handleAddReview(data) {
    try {
      const newReview = await addReview({
        user: user.username,
        book: book.id,
        author: book.author,
        genre: book.genre,
        message: data.content,
        rating,
      });

      // Add the new review to the reviews list
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setRating(0); // Reset rating after posting a review
    } catch (err) {
      console.error("Create review error:", err);
    }
  }

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
              </div>
            </div>
          </div>
        </div>

        <div className="book-content">
          <LibraryList
            key={book.id}  // Use book.id as key here
            type="playlists"
            title={title}
            header={'Listen Now'}
            book={book}
          />
        </div>

        <div className="comments-section">
          <h3 className="readers-say">What Other Readers Say</h3>

          <div className="comments-list">
            {reviews.length > 0 ? (
              reviews.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <p className="comment-text">{comment.content || 'No comment content'}</p>
                  <div className="comment-box-thing">
                    <span className="comment-user">{comment.username || 'Anonymous'}</span>
                    <span className="comment-date">
                      {dayjs(comment.createdAt).fromNow() || 'No date available'}
                    </span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        style={{
                          fontSize: '1rem',
                          color: comment.rating >= star ? 'gold' : 'gray',
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>

          <form className="comment-form" onSubmit={handleSubmit(handleAddReview)}>
            <textarea
              placeholder="Add your comment..."
              className="comment-input"
              {...register("content", { required: "Please write a comment!" })}
            />
            <StarRating rating={rating} setRating={setRating} />
            <button type="submit" className="comment-submit-btn">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Book;
