import React, { useState, useCallback } from 'react';
import useFetch from './useFetch';
import './App.css';

function App() {
  let [searchTerm, setSearchTerm] = useState('')

  const handleInput = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  let articles = useFetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${searchTerm}`)
  return(
    <div>
      <input
        type='search'
        onChange={handleInput}
        className='search-bar'
        placeholder='Search wiki'
      />
      {articles.map((article) => (
        Array.isArray(article)
          ? article.map(item =>
            item.length && item.includes('http')
            ? <li key={item} className='result'>
                <a href={item}>{item}</a>
               </li>
            : null)
          : null
      ))}
    </div>
  )
}

export default App;