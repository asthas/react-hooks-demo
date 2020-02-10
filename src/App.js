import React, { useState, useCallback } from 'react';
import useFetch from './useFetch';
import useFetchAllRequests from './useFetchAllRequests';
import useDebounce from './useDebounce';
import './App.css';

function App() {
  let [searchTerm, setSearchTerm] = useState('')

  const handleInput = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  let articles =
    useFetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${debouncedSearchTerm}`)

  const fileteredArticles = (articles) => articles[3] || []

  let previews =
    useFetchAllRequests(fileteredArticles(articles))

  return(
    <div>
      <input
        type='search'
        onChange={handleInput}
        className='search-bar'
        placeholder='Search wiki'
      />
      {previews && previews.map(preview => <li>{preview}</li>)}
    </div>
  )
}

export default App;