import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import LibraryGrid from './LibraryGrid';
import { getUserDetails } from '../../api/userAPI';

const AuthorProfile = () => {
  const [followerCount, setFollowerCount] = useState(0); 
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const [user, setUser] = useState({
    username: '',
    isAuthor: false,
    bio: '',
    backgroundImage: 'https://picsum.photos/3000/3000', // i am defaulting to this image because we're most probably going to call it from the db
  });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserDetails(username);
        setUser({
          username: userData.username,
          isAuthor: userData.isAuthor,
          bio: userData.bio || '',
          backgroundImage: 'https://picsum.photos/3000/3000',
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [username]);
  
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
          <div className="author-profile-header" style={{ backgroundImage: `url('${user.backgroundImage}')`}}>
            <div className="author-profile-header-overlay">
              <div className="author-profile-identity">
                <h1 className="author-profile-title">{user.username}</h1>
                {!user.isAuthor && (
                  <p className="author-profile-follow-count">
                    {followerCount.toLocaleString()} followers
                  </p>
                )}
              </div>
              {!user.isAuthor && (
                <div className="author-profile-actions">
                  <button className={followButtonClass} onClick={() => setIsFollowing(!isFollowing)}>
                    {followButtonText}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="author-profile-content">
            {user.isAuthor ? (
              // Author view
              <>
                <LibraryGrid type="books" username={user.username} />
                <LibraryGrid type="playlists" username={user.username} />
              </>
            ) : (
              //Uset view
              <>
                <LibraryGrid type="favorites" username={user.username} />
                <LibraryGrid type="playlists" username={user.username} />
                <LibraryGrid type="following" username={user.username} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile; 