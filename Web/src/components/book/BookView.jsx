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
    BookCoverImage: 'https://picsum.photos/200/300', 
    description: "This is a world divided by blood—red or silver. The Reds are commoners, ruled by a Silver elite in possession of god-like superpowers. And to Mare Barrow, a seventeen-year-old Red girl from the poverty-stricken Stilts, it seems like nothing will ever change. That is until she finds herself working in the Silver Palace. Here, surrounded by the people she hates the most, Mare discovers that, despite her red blood, she possesses a deadly power of her own. One that threatens to destroy the balance of power. Fearful of Mare's potential, the Silvers hide her in plain view, declaring her a long-lost Silver princess, now engaged to a Silver prince. Despite knowing that one misstep would mean her death, Mare works silently to help the Red Guard, a militant resistance group, and bring down the Silver regime. But this is a world of betrayal and lies, and Mare has entered a dangerous dance—Reds against Silvers, prince against prince, and Mare against her own heart.",
    author: "Victoria Aveyard",
  });

  // const [comments, setComments] = useState([
  //   { id: 1, text: "Great book!", user: "Reader1", date: "2025-04-08" },
  //   { id: 2, text: "Really enjoyed the plot", user: "BookLover", date: "2025-04-09" }
  // ]);

  const [reviews , setReviews ] = useState([]);
  // const [comment, setComment ] = useState([
  //     { id: 1, text: "Great book!", user: "Reader1", date: "2025-04-08" },
  //     { id: 2, text: "Really enjoyed the plot", user: "BookLover", date: "2025-04-09" }
  //   ]);

   useEffect(() =>{
          async function get_Reviews() {
              try {
                  console.log("Fetching reviews... for book id: ", book.id);  //remove after debugging
                  const fetchedreviews = await getReviews(book.id);
                  console.log("Fetched reviews:", fetchedreviews);
                  //setUsers(fetchedreviews);
                  setReviews(fetchedreviews);
              }
              catch (error) {
                  console.error("Fetching reviews error: ", error);
                  // setFetchReviewssError(true);  //add errors later
              }
          }
          get_Reviews();
      }, []);

    async function handleAddReview(data) {
      try {
        console.log('frontend: sending maya, ', book.id, ', and ', data);
        const review = await addReview({
          user: 'maya',
          book: book.id,
          message: data.conent,
        });
        console.log('frontend: added comment yay');

        setReviews([...reviews, review]);
      } catch (err) {
        console.error("Create review error:", err);
        // setAddError(true);
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
            key={1} //this needs a key but idk what this is hehe, i just put 1 for now
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
                  <p className="comment-text">{comment.content || 'fail'}</p>
                  <div className="comment-box-thing ">
                    <span className="comment-user">{comment.username || 'fail'}</span>
                    <span className="comment-date">{comment.createdAt || 'fail'}</span>
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