import React from 'react'
import './Book.css'

const Book = ({ data, action, actionLabel }) => {
    return (
        <div className="imageContainer">
            <img className="bookImage" src={data.cover} alt="" />
            <button className="actionButton" onClick={() => action(data.ISBN)}>{actionLabel}</button>
        </div>

    )
}

export default Book
