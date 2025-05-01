import React, { useState, useEffect } from 'react';
import { getAllFollowing } from '../../api/followAPI';
import { getUserBooks } from '../../api/bookAPI';
import { getUserPlaylists } from '../../api/playlistAPI';
import { getUserFavorites } from '../../api/favoriteAPI';

const LibraryGrid = ({ type, username }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (!username) return;
      
      try {
        let data;
        if (type === 'books') {
          data = await getUserBooks(username);
        } else if (type === 'playlists') {
          data = await getUserPlaylists(username);
        } else if (type === 'following') {
          data = await getAllFollowing(username);
        } else if (type === 'favorites') {
          data = await getUserFavorites(username);
        }

        setItems(data);
        setError(null);
      } catch (err) {
        console.error(`Couldn't load ${type}:`, err);
        setError(`Failed to load ${type}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type, username]);

  if (loading) return <div className="author-profile-loading">Loading...</div>; // neat ? 

  return (
    <div className="author-profile-library">
      <h2 className="author-profile-section-title">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
      <div className="author-profile-grid">
        {items.map((item) => (
          <div key={item.id} className="author-profile-grid-item">
            <div className="author-profile-book-cover"
              style={{
                backgroundImage: `url('${('https://picsum.photos/200/300')}')`,
                backgroundSize: 'cover',backgroundPosition: 'center'
              }}
            />
            <div className="author-profile-book-info">
              <h3 className="author-profile-book-title">
                {type === 'following' ? item.username :
                 type === 'playlists' ? item.name :
                 item.title}
              </h3>
              <p className="author-profile-book-author">
                {type === 'following' ? (item.isAuthor ? 'Author' : 'User') :
                 type === 'playlists' ? `${item.bookCount || 0} books` :
                 item.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryGrid;