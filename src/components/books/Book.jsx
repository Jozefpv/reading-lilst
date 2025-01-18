import React from 'react'
import './Book.css'

const Book = ({book, action, actionLabel}) => {
  return (
    <div className='bookContainer'>
      <img className='coverBook' src={book.cover} alt="" />
      <button className='actionButton' onClick={() => action(book.ISBN)}>{actionLabel}</button>
    </div>
  )
}

export default Book
