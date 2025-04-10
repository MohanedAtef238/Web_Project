import'./displaybooks.css'
import SearchBar from '../searchbar/searchbar';
import { useEffect, useState } from "react";

function BookCard({ title, author, cover }) {
  return (
    <div className="book-card">
      <img src={cover} alt={title} />
      <h3>{title}</h3>
      <p>{author}</p>
    </div>
  );
}

function Row({ category, books }) {
  return (
    <div className="row">
      <h2>{category}</h2>
      <div className="book-row">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            cover={book.cover}
          />
        ))}
      </div>
    </div>
  );
}

export default function DisplayBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [ 'fantasy','science_fiction', 'biographies', 'recipes', 
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

  
    
  useEffect(() => {
    Promise.all(
      categories.map((category) =>
        fetch(`https://openlibrary.org/subjects/${category}.json?limit=15`)
          .then((res) => res.json())
          .then((data) => {
            return data.works.map((book, index) => {
              let author = "Unknown";
              if (book.authors && book.authors.length > 0 && book.authors[0].name) {
                author = book.authors[0].name;
              }
              return {
                id: `${category}-${index}`,
                title: book.title,
                author: author,
                category: categoryNamesMapping[category] || category,
                cover: `https://picsum.photos/600?random=${category}-${index}`,
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
        <div className="search-results">
          <h3>Results</h3>
          <div className="book-row">
            {searchResults.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                cover={book.cover}
              />
            ))}
          </div>
        </div>
      );
    } else {
      x = <p>No results sop sop :(</p>;
    }
  } else {
    const grouped = categories.map((category) => {
      const finalBooks = books.filter((book) => book.category === categoryNamesMapping[category]);
      return (
        <Row
          key={category}
          category={categoryNamesMapping[category]}
          books={finalBooks}
        />
      );
    });
    x = grouped;
  }

  return (
    <div className="display-books">
    <SearchBar value={searchQuery} onChange={handleSearch}/>
      {x}
    </div>
  );
}
