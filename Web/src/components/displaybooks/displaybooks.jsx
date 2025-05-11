import './displaybooks.css';
import SearchBar from '../searchbar/searchbar';
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa'; 
import { useAuth } from '../../Context';
import { addInteractions, fetchRecommendations } from '../../api/recommendationAPI';

function BookCard({ title, author, cover, onClick }) {
  return (
    <div className="book-cardd" onClick={onClick}>
      <img src={cover} alt={title} />
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
}

function Row({ category, books, onClick }) {
  return (
    <div className="rowd">
      <h2>{category}</h2>
      <div className="book-rowd">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
            onClick={() => onClick(book)}
          />
        ))}
      </div>
    </div>
  );
}

export default function DisplayBooks() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);

  const { logout, user } = useAuth();

  const categories = ['fantasy', 'science_fiction', 'biographies', 'recipes', 
    'romance', 'textbooks', 'children', 'history', 'religion', 
    'mystery_and_detective_stories', 'plays', 'science'];

  const categoryNamesMapping = {
    fantasy: 'Must Read',
    science_fiction: 'Science Fiction',
    biographies: 'Biographies',
    recipes: 'Recipes',
    romance: 'Romance Novels',
    textbooks: 'Textbooks',
    children: 'Children\'s Books',
    history: 'History & Culture',
    religion: 'Religion & Philosophy',
    mystery_and_detective_stories: 'Mystery & Detective',
    plays: 'Plays & Dramas',
    science: 'Science & Technology'
  };

  const handleProfileClick = () => {
    if (user?.username) {
      navigate(`/profile/${user.username}`);
    } else {
      navigate('/login');
    }
  };

  const handleBookClick = async (book) => {
    try {
      await addInteractions(user?.id, book.id, "click");
      console.log('added interaction!');
    } catch (error) {
      console.error("Failed to log interaction", error);
    }

    let description = 'No description available.'; 
    try {
      const response = await fetch(`https://openlibrary.org${book.key}.json`);
      const bookDetails = await response.json();
      description = bookDetails.description?.value || bookDetails.description || description;
    } catch (error) {
      console.error(`Error fetching description for ${book.title}:`, error);
    }

    navigate(`/book/${book.title}`, {
      state: {
        book: {
          ...book,
          description,
        },
      },
    });
  };

  useEffect(() => {
    Promise.all(
      categories.map((category) =>
        fetch(`https://openlibrary.org/subjects/${category}.json?limit=15`)
          .then((res) => res.json())
          .then((data) => {
            return data.works.map((book, index) => {
              const { title, authors, key } = book;
              const author = authors?.[0]?.name || "Unknown";
              return {
                id: `${category}-${index}`,
                title,
                author,
                category: categoryNamesMapping[category] || category,
                cover: `https://picsum.photos/600?random=${category}-${index}`,
                key,
              };
            });
          })
      )
    ).then((allBooksByCategory) => {
      setBooks(allBooksByCategory.flat());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchRecommendations(user.id)
        .then(setRecommendations)
        .catch(console.error);
    }
  }, [user]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      setSearchResults(
        books.filter((book) =>
          book.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  let content;
  if (loading) {
    content = <p>Loading books...</p>;
  } else if (searchQuery.trim() !== "") {
    content = searchResults.length > 0 ? (
      <div className="search-resultsd">
        <h3>Results</h3>
        <div className="book-rowd">
          {searchResults.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              cover={book.cover}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
      </div>
    ) : (
      <p>No results found for "{searchQuery}"</p>
    );
  } else {
    content = categories.map((category) => {
      const categoryBooks = books.filter(
        (book) => book.category === categoryNamesMapping[category]
      );
      return (
        <Row
          key={category}
          category={categoryNamesMapping[category]}
          books={categoryBooks}
          onClick={handleBookClick}
        />
      );
    });
  }

  return (
    <div className="display-booksd">
      <div className="header">
        <div className="search-and-buttons">
          <div className="search-bar-container">
            <SearchBar value={searchQuery} onChange={handleSearch} />
          </div>
          <div className="button-container">
            <div className="profile-icon" onClick={handleProfileClick}>
              <FaUser size={20} color="#fff" />
            </div>
            <div className="settings-icon" onClick={() => navigate('/settings')}>
              <FaCog size={20} color="#fff" />
            </div>
            <Link to='/' onClick={logout}>
              <div className="logout-icon">
                <FaSignOutAlt size={20} color="#fff" />
              </div>
            </Link>
          </div>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate('/browsecategories')}>Browse by Categories</button>
          <button onClick={() => navigate('/listener')}>Listen Along</button>
          <button onClick={() => navigate('/streamer')}>Stream Now</button>
        </div>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <>
          {recommendations.length > 0 && (
            <Row
              category="Recommended For You"
              books={recommendations.map((book, index) => ({
                id: `rec-${index}`,
                title: book.title,
                author: book.author || 'Unknown',
                cover: book.cover || `https://picsum.photos/600?random=recommend-${index}`,
                key: book.key || '',
              }))}
              onClick={handleBookClick}
            />
          )}
          {content}
        </>
      )}
    </div>
  );
}
