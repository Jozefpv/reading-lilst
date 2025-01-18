import React, { useEffect, useState } from 'react'
import './App.css'
import data from './books.json'
import BooksList from './components/booksList/BooksList'

const App = () => {

  const [books, setBooks] = useState(data.library)
  const [pages, setPages] = useState(0)
  const [maxPages, setMaxPages] = useState(0)
  const [categories, setCategories] = useState([])
  const [readBooks, setReadBooks] = useState([])
  const [listData, setListData] = useState({books: 0, readBooks: 0})


  useEffect(() => {
    const maxPages = Math.max(...books.map((item) => item.book.pages))
    setMaxPages(maxPages)
    const categories = books.reduce((acc, item) => {
      if (!acc.includes(item.book.genre)) {
        acc.push(item.book.genre)
      }
      return acc
    }, ['Todos'])
    setCategories(categories)
  }, [])


  useEffect(()=> {
    const numOfBooks = books.filter(item => item.book.pages >= pages).length
    const numOfReadBooks = readBooks.filter(item => item.book.pages >= pages).length

    setListData({
      books: numOfBooks,
      readBooks: numOfReadBooks
    })
  }, [books, pages])

  const filterByPages = (event) => {
    setPages(event.target.value)
  }

  const filterByCategories = (event) => {
    const selectedCategory = event.target.value
    let filteredBooks = data.library

    if (selectedCategory.toUpperCase() !== "TODOS") {
      filteredBooks = filteredBooks.filter((item) => item.book.genre === selectedCategory)
    }

    setBooks(filteredBooks)
  }


  const addToReadList = (isbn) => {
    const selectedBook = books.find(item => item.book.ISBN === isbn)
    setReadBooks([...readBooks, selectedBook])
    setBooks([...books.filter(item => item.book.ISBN !== isbn)])
  }

  const removeFromReadList = (isbn) => {
    const selectedReadBook = readBooks.find(item => item.book.ISBN === isbn)
    if(!books.includes(selectedReadBook)){
      setBooks([...books, selectedReadBook])
    }
    setReadBooks([...readBooks.filter(item => item.book.ISBN !== isbn)])

  }


  return (
    <div className='container'>
      <h2>Prueba técnica</h2>
      <p>Libros con mas de: {pages}</p>
      <input type="range" max={maxPages} min={0} value={pages} onChange={filterByPages} />
      <select onChange={filterByCategories}>
        {categories.map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>

      <div className='booksListsContainer'>
        <div className='bookListContainer'>
          <h3>Libros disponibles {listData.books}</h3>
          <BooksList books={books.filter(item => item.book.pages >= pages)} action={addToReadList} actionLabel="+" />
        </div>
        <div className='bookListContainer'>
         <h3>Lista de lectura {listData.readBooks}</h3>
         <BooksList books={readBooks.filter(item => item.book.pages >= pages)} action={removeFromReadList} actionLabel="-" />
        </div>
      </div>
    </div>
  )
}

export default App
