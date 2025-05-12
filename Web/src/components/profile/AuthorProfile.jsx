import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import LibraryGrid from './LibraryGrid';
import { getUserDetails } from '../../api/userAPI';
import { useAuth } from '../../Context';
import { getFollowerCount, getAllFollowing, followUser, unfollowUser } from '../../api/followAPI';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AuthorProfile = () => {
  const [followerCount, setFollowerCount] = useState(0);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const { user: currentUser } = useAuth();

  function checkOwner(currentUser, profileUser) {
    if (!currentUser || !profileUser) return false;
    return currentUser.username === profileUser.username;
  }

  const [user, setUser] = useState({
    username: '',
    isAuthor: false,
    bio: '',
    backgroundImage: 'https://picsum.photos/3000/3000',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!username) {
          console.error('No username provided');
          return;
        }

        const userData = await getUserDetails(username);
        if (!userData) {
          console.error('No user data returned');
          return;
        }

        setUser({
          id: userData.id,
          username: userData.username,
          isAuthor: userData.isAuthor,
          bio: userData.bio || '',
          backgroundImage: 'https://picsum.photos/3000/3000',
        });

        const count = await getFollowerCount(username);
        setFollowerCount(count?.count || 0);

        if (currentUser?.username) {
          const followingList = await getAllFollowing(currentUser.username);
          if (Array.isArray(followingList)) {
            const followingUsernames = followingList.map(user => user.username);
            const isAlreadyFollowing = followingUsernames.includes(username);
            setIsFollowing(isAlreadyFollowing);
          }
        }
      } catch (error) {
        console.error('Error fetching user or follow info:', error);
        setError(error.message);
      }
    };

    fetchUser();
  }, [username, currentUser]);

  const followButton = async () => {
    try {
      if (!currentUser?.username || !user?.username) {
        console.error('Missing user information', { currentUser, user });
        return;
      }

      console.log('Follow button clicked:', {
        currentUser: currentUser.username,
        targetUser: user.username,
        isFollowing
      });

      if (isFollowing) {
        await unfollowUser(currentUser.username, user.username);
        setIsFollowing(false);
      } else {
        await followUser(currentUser.username, user.username);
        setIsFollowing(true);
      }

      const updatedCount = await getFollowerCount(username);
      setFollowerCount(updatedCount?.count || 0);
    } catch (error) {
      console.error('Follow error:', error.response?.data || error);
      setError(error.message);
    }
  };

  const Owner = checkOwner(currentUser, user);
  const followButtonClass = `author-profile-follow-btn${isFollowing ? ' author-profile-follow-btn--following' : ''}`;
  const followButtonText = isFollowing ? 'Following' : 'Follow';

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="author-profile-wrapper">
      <Link to='/homepage' className='homehome'>
        <FaHome />
      </Link>
      <div className="author-profile-container">
        <div className="author-profile">
          <div className="author-profile-header" style={{ backgroundImage: `url('${user.backgroundImage}')`}}>
            <div className="author-profile-header-overlay">
              <div className="author-profile-identity">
                <h1 className="author-profile-title">{user.username}</h1>
                <p className="author-profile-follow-count">
                  {followerCount.toLocaleString()} followers
                </p>
              </div>
              {!Owner && currentUser && (
                <div className="author-profile-actions">
                  <button className={followButtonClass} onClick={followButton}>
                    {followButtonText}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="author-profile-content">
            {user.isAuthor ? (
              <LibraryGrid type="books" username={user.username} />
            ) : (
              <>
                <LibraryGrid type="favorites" username={user.username} />
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