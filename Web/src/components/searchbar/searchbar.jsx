import'./searchbar.css'
import image from '../../assets/image.png' 

import { useState } from "react";

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
              key={`${book.id}-${book.category}`}
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

  const books = [
    { id: 1, title: "Anathema", author: "carolaine", cover: image, category: "must read" },
    { id: 2, title: "oo", author: "k", cover: "none" , category: "must read" },
    { id: 3, title: "l", author: "l", cover: "none", category: "must read" },
    { id: 4, title: "oo", author: "k", cover: "none", category: "must read" },
    { id: 5, title: "j", author: "l", cover: "none", category: "comedy" },
    { id: 6, title: "oo", author: "k", cover: "none", category: "comedy" },
    { id: 7, title: "l", author: "l", cover: "none", category: "comedy" },
    { id: 8, title: "oo", author: "k", cover: "none", category: "comedy" },
    { id: 5, title: "j", author: "l", cover: "none", category: "comedy" },
    { id: 6, title: "0", author: "cat", cover: "none", category: "comedy" },
    { id: 7, title: "cats", author: "l", cover: "none", category: "comedy" },
    { id: 8, title: "cats", author: "k", cover: "none", category: "comedy" },
    { id: 5, title: "j", author: "l", cover: "none", category: "tragedy" },
    { id: 6, title: "0", author: "cat", cover: "none", category: "tragedy" },
    { id: 7, title: "cats", author: "l", cover: "none", category: "tragedy" },
    { id: 8, title: "cats", author: "k", cover: "none", category: "tragedy" }
  ];

  const categories = [...new Set(books.map((book) => book.category))];

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

    if (searchQuery.trim() !== "") {
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
    x = categories.map((category) => {
        const finalBooks = books.filter((book) => book.category === category);
        return (
        <Row
            key={category}
            category={category}
            books={finalBooks}
        />
        );
    });
    }
return (
    <div className="display-books">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {x}
    </div>
  );
}