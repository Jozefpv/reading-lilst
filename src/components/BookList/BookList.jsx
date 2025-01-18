import React from 'react'
import Book from '../Book/Book'
import './BookList.css'

const BookList = ({books, action, actionLabel}) => {
  return (
    <div className='booksContainer'>
      {
        books.map((item) => {
           return <Book data={item.book} action={action} actionLabel={actionLabel}/>
        })
      }
    </div>
  )
}

export default BookList
