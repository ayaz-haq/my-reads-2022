import React from 'react';
import Book from './Book';
import "../App.css"

const Shelf = ({ books, title, updateBookShelf }) => {

    return (
        <div className="bookshelf" sx={{padding:'0 10px 20px'}}>
            <h2 className="bookshelf-title" sx={{borderBottom:'1px solid #dedede'}}>{title}</h2>
            <div className="bookshelf-books" sx={{textAlign:'center'}}>
                <ol className="books-grid" sx={{listStyleType:'none',padding:0,margin:0,display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                    {books.map(b => (
                        <li key={b.id} sx={{padding:'10px 15px',textAlign:'left'}}>
                            <Book book={b} sendFrom="shelf" changeBookShelf={updateBookShelf}/>
                        </li>
                    ))}

                </ol>
            </div>
        </div>
    )
}

export default Shelf;