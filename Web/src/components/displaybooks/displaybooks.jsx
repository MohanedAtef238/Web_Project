import './displaybooks.css';
import SearchBar from '../searchbar/searchbar';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa'; 

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

  const handleBookClick = async (book) => {
    console.log(`Clicked book: ${book.title}`);

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
              const author = authors && authors.length > 0 ? authors[0].name : "Unknown";
              
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
      const all = allBooksByCategory.flat();
      setBooks(all);
      setLoading(false);
    });
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const results = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  let x;
  if (loading) {
    x = <p>Loading books...</p>;
  } else if (searchQuery.trim() !== "") {
    if (searchResults.length > 0) {
      x = (
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
      );
    } else {
      x = <p>No results found for "{searchQuery}"</p>;
    }
  } else {
    const grouped = categories.map((category) => {
      const finalBooks = books.filter((book) => book.category === categoryNamesMapping[category]);
      return (
        <Row
          key={category}
          category={categoryNamesMapping[category]}
          books={finalBooks}
          onClick={handleBookClick}
        />
      );
    });
    x = grouped;
  }

  return (
    <div className="display-booksd">
    <SearchBar value={searchQuery} onChange={handleSearch}/>
    <div className="settings-icon" onClick={() => navigate('/settings')}>
        <FaCog size={30} />
      </div>
      {x}
    </div>
  );
}
