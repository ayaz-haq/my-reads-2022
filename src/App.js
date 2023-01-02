import React, { useState, useEffect } from 'react'
import { Routes,Route, } from "react-router-dom";
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import Book from './components/Book'
// import { useDebounce } from 'use-debounce';

import useQuery from './hooks/useQuery'
import Search from './pages/Search'
import BookShelf from './pages/BookShelf'

const BooksApp = () => {


  const [books, setBooks] = useState([])
  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const [query, setQuery] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  // const [searchBooks, setSearchBooks] = useQuery(query);
  const [mergedBooks, setMergedBooks] = useState([]);


  useEffect(() => {

    BooksAPI.getAll()
      .then(data => {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data))
      }
      );
  }, [])

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

  // useEffect(() => {

  //   const combined = searchBooks.map(book => {
  //     if (mapOfIdToBooks.has(book.id)) {
  //       return mapOfIdToBooks.get(book.id);
  //     } else {
  //       return book;
  //     }
  //   })
  //   setMergedBooks(combined);
  // }, [query])
  const testSearch = () => {
    BooksAPI.search("the").then(data => {
      if(data.error){
        // setSearchBooks([])
        console.log("the",data)
      } else {
        
          // setSearchBooks(data);
          console.log("the",data)
        
      }
    })
  }

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

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const updateBookShelf = (book, whereTo) => {
    const updatedBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updatedBooks.push(book)
    }
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  }
  
  return (
    <div className="app">
      <Routes>
          {/* SEARCH */}
          <Route excat path="/search" element={<Search updateBookShelf={updateBookShelf} /> } />    

          {/* MAIN PAGE */}
          <Route excat path="/" element={<BookShelf books={books} updateBookShelf={updateBookShelf}/>}/>
            
      </Routes>
    </div>
  )

}

export default BooksApp
