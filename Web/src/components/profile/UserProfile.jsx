import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';
import LibraryGrid from './LibraryGrid';

const UserProfile = () => {
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAuthor, setIsAuthor] = useState(true);
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
    <div className="user-profile-wrapper">
      <div className="user-profile-container">
        <div className="user-profile">
        <div className="user-profile-header" style={{ backgroundImage: `url('${authorData.AuthorBackgroundImage}')`}}>
          <div className="user-profile-header-overlay">
            <h1 className="user-profile-title">{username}</h1>
          <div className="user-profile-actions">
            <button className={followButtonClass} onClick={() => setIsFollowing(!isFollowing)}>
              {followButtonText}
            </button>
          </div>
        </div>
        </div>
        <div className="user-profile-content">
        {isAuthor && <LibraryGrid type="books" authorName={username}  header="My Favorite Books" />}
            <LibraryGrid type="playlists" authorName={username}  header="My Playlists"/>
            <LibraryGrid type="following"   header="My Following"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 