import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import LibraryGrid from './LibraryGrid';

const AuthorProfile = () => {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [authorData, setAuthorData] = useState({
    AuthorBackgroundImage: 'https://picsum.photos/3000/3000', // will also be replaced with fetched data from db
  });
  
  let followButtonClass = 'author-profile-follow-btn';
  if (isFollowing) {
    followButtonClass += ' author-profile-follow-btn--following';
  }

  let followButtonText = 'Follow';
  if (isFollowing) {
    followButtonText = 'Following';
  }

  return (
    <div className="author-profile-wrapper">
      <div className="author-profile-container">
        <div className="author-profile">
        <div className="author-profile-header" style={{ backgroundImage: `url('${authorData.AuthorBackgroundImage}')`}}>
          <div className="author-profile-header-overlay">
            <h1 className="author-profile-title">{username}</h1>
          <div className="author-profile-actions">
            <button className={followButtonClass} onClick={() => setIsFollowing(!isFollowing)}>
              {followButtonText}
            </button>
          </div>
        </div>
        </div>
        <div className="author-profile-content">
        {isAuthor && <LibraryGrid type="books" authorName={username} />}
            <LibraryGrid type="playlists" authorName={username} />
            <LibraryGrid type="recommendations" authorName={username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile; 