import React, { useState, useCallback, useEffect } from 'react';
import useFetch from './useFetch';
import useDebounce from './useDebounce';
import './App.css';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])

  const handleInput = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  let articles =
    useFetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${debouncedSearchTerm}`)

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