import React from 'react'
import Book from '../books/Book'
import './BooksList.css'

const BooksList = ({books, action, actionLabel}) => {
  return (
    <div className='booksListContainer'>
      {books.map((item) => (
        <Book book={item.book} action={action} actionLabel={actionLabel}/>
      ))}
    </div>
  )
}

export default BooksList
