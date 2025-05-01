import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useLocation } from 'react-router-dom';
import './BookView.css';
import LibraryList from '../playlist/LibraryList';
import { addReview, getReviews } from '../../api/reviewAPI';

const Book = () => {
  const { title } = useParams(); 
  const location = useLocation(); 
  const book = location.state?.book;

   const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();

  const [likedCount, setLikedCount] = useState(10000);
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthorBooks, setIsAuthorBooks] = useState(true);
  const [bookData, setBookData] = useState({
      BookCoverImage: book?.cover || 'https://picsum.photos/200/300',
      description: book?.description || 'No description available.',
      author: book?.author || 'Unknown Author',
  });

  // const [comments, setComments] = useState([
  //   { id: 1, text: "Great book!", user: "Reader1", date: "2025-04-08" },
  //   { id: 2, text: "Really enjoyed the plot", user: "BookLover", date: "2025-04-09" }
  // ]);

  const [reviews , setReviews ] = useState([]);
  const [comment, setComment ] = useState();

   useEffect(() =>{
          async function get_Reviews() {
              try {
                  console.log("Fetching reviews...");
                  const fetchedreviews = await getReviews(book);
                  console.log("Fetched reviews:", fetchedreviews);
                  setUsers(fetchedreviews);
              }
              catch (error) {
                  console.error("Fetching reviews error: ", error);
                  setFetchReviewssError(true);  //add errors later
              }
          }
          get_Reviews();
      }, []);

    async function handleAddReview(data) {
      try {
        const review = await addReview(data);
        const addedRev = reviews + review;
        setReviews(addedRev);
      } catch (err) {
        console.error("Create review error:", err);
        setAddError(true);
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
            {reviews.length > 0 ? (
              reviews.map(comment => (
                <div key={comment.id} className="comment-item">
                  <p className="comment-text">{comment.content}</p>
                  <div className="comment-box-thing ">
                    <span className="comment-user">{comment.username}</span>
                    <span className="comment-date">{comment.createdAt}</span>
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
              {...register("conent", { required: "lol idiot you didnt add a comment" })}
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