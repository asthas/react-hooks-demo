import React, { useState, useCallback } from 'react';
import useFetch from './useFetch';
import useFetchAllRequests from './useFetchAllRequests';
import useDebounce from './useDebounce';
import './App.css';

const defaultVal = []

function App() {
  let [searchTerm, setSearchTerm] = useState('')

  const handleInput = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  let articles =
    useFetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${debouncedSearchTerm}`)

  let previews =
    useFetchAllRequests(articles[1] || defaultVal)

  const createMarkup = (markup) => ({__html: markup})

  return(
    <div>
      <input
        type='search'
        onChange={handleInput}
        className='search-bar'
        placeholder='Search wiki'
      />
      {console.log(previews)}
      {previews && previews.map(previewList =>
        previewList.map(
          preview =>
            <li key={preview.pageid.toString()}
              dangerouslySetInnerHTML={createMarkup(preview.snippet)}>
            </li>
          )
      )}
    </div>
  )
}

export default App;