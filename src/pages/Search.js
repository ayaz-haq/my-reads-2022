import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'
import "../App.css"


const Search = ({updateBookShelf}) => {
    const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  useEffect(() => {
    if(query){
      BooksAPI.search(query).then(data => {
        if (data.error || query === ""){
          console.log(data)
          setSearchBooks([])
        } else {
          setSearchBooks(data)
        }
      })
    }
  },[query, setSearchBooks])

  useEffect(() => {
    // testSearch();
    if(query){
      BooksAPI.search(query).then(data => {
        if(data.error){
          setSearchBooks([])
          console.log("book search empty list",data)
        } else {
          if (true){
            setSearchBooks(data);
            console.log(data)
          }
        }
      })
    }
    
  },[query, setSearchBooks])
  return (
    <>
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                  
                  <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {  searchBooks.map(b => (
                    <li key={b.id}>
                      {/* {testSearch()} */}
                      {b?
                      <Book book={b} sendFrom="search" changeBookShelf={updateBookShelf} />
                      :<></>
                    }

                    </li>
                  ))}
                </ol>
              </div>
            </div>
                  </>
  )
}

export default Search