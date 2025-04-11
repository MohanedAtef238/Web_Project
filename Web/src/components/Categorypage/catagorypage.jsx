import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './categorypage.css'

export default function CategoryBooks() {
  const {id} = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryNamesMapping = {
    fantasy: 'Must Read',
    science_fiction: 'Science Fiction',
    biographies: 'Biographies',
    recipes: 'Recipes',
    romance: 'Romance',
    textbooks: 'Textbooks',
    children: 'Children\'s',
    history: 'History',
    religion: 'Philosophy',
    mystery_and_detective_stories: 'Mystery',
    plays: 'Dramas',
    science: 'Technology',
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("id testing", id);
        const response = await fetch(`https://openlibrary.org/subjects/${id}.json`);
        const data = await response.json();
        
        setBooks(data.works || []);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);


  const categoryName = categoryNamesMapping[id] || id; 

  if (loading) {
    return <p className='loading'>Loading books...</p>;
  }

  return (
    <div>
      <h1 className='catname'>Books in {categoryName} Category</h1>
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book.key} className="book-card">
              <img
                src={`https://picsum.photos/600?random=${book.key}`} 
                alt={book.title}
              />
              <h3>{book.title}</h3>
              <p>{book.authors?.map(author => author.name).join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No books found sop sop :(</p>
        )}
      </div>
    </div>
  );
}
