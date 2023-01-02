import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Shelves from '../components/Shelves'
import "../App.css"

const BookShelf = ({updateBookShelf,books}) => {
  return (
        <>
            <div className="list-books">
            {/* {console.log("SEARCH", searchBooks)} */}

              <Header />
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div >
                <div className='open-search'>

                <Link to="/search">
                  Add a book
                </Link>
                </div>
              </div>
            </div>
        </>
    )
}

export default BookShelf