import { useEffect, useState } from 'react';
import './App.css'

import data from './books.json';
import BookList from './components/BookList/BookList';

function App() {

  const [books, setBooks] = useState(data.library)
  const [booksReaded, setBooksReaded] = useState([])
  const [maxPages, setMaxPages] = useState(0)
  const [pages, setPages] = useState(50)
  const [categories, setCategories] = useState([])


  useEffect(() => {
    const max = Math.max(...books.map(item => item.book.pages))
    setMaxPages(max)
    const categories = [...new Set(books.map(item => item.book.genre))]
    setCategories(['Todos', ...categories])
  }, [])

  const filterByPages = (event) => {
    setPages(event.target.value)
  }

  const addBookToReadedList = (isbn) => {
    const bookToRead = books.find(item => item.book.ISBN === isbn);
    setBooksReaded([...booksReaded, bookToRead]);
    setBooks([...books.filter(item => item.book.ISBN !== isbn)])
  }

  const removeBookFromReadedList = (isbn) => {
    const bookToRead = booksReaded.find(item => item.book.ISBN === isbn);
    setBooks([...books, bookToRead])
    setBooksReaded([...booksReaded.filter(item => item.book.ISBN !== isbn)])
  }

  const selectedCategory = (event) => {
    const selectedCategory = event.target.value;

    let filteredBooks = data.library;

    if (selectedCategory !== "Todos") {
      filteredBooks = filteredBooks.filter(item => item.book.genre === selectedCategory);
    }

    setBooks(filteredBooks);
  }

  return (
    <>
      <h2>Prueba tecnica</h2>
      <input type="range" min={0} max={maxPages} value={pages} onChange={filterByPages} />
      <p>Mas de {pages} páginas</p>
      <select onChange={selectedCategory}>
        {categories.map((item) => <option value={item}>{item}</option>)}
      </select>
      <div className='listsContainer'>
        <div className='booksList'>
          <h3>Libros</h3>
          <BookList books={books.filter(item => item.book.pages >= pages)} action={addBookToReadedList} actionLabel="+" />
        </div>
        <div className='booksReadedList'>
          <h3>Libros leídos</h3>
          <BookList books={booksReaded} action={removeBookFromReadedList} actionLabel="-" />
        </div>
      </div>
    </>
  )
}

export default App
