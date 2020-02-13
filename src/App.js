import React, { useState, useCallback } from 'react';
import sanitizeHtml from 'sanitize-html';
import useFetch from './useFetch';
import useFetchAllRequests from './useFetchAllRequests';
import useDebounce from './useDebounce';
import './App.css';

const defaultVal = []

const createMarkup = (markup) => (
  {__html: sanitizeHtml(markup, {
    allowedTags: [ 'span' ],
    allowedClasses: {
      span: ['searchmatch']
    }
  })}
)

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

  return(
    <div>
      <input
        type='search'
        onChange={handleInput}
        className='search-bar'
        placeholder='Search wiki'
      />
      {previews && previews.map(previewList =>
        previewList.map(
          preview =>
            <div className='preview'>
              <div className='title'>{preview.title}</div>
              <li key={preview.pageid.toString()}
                dangerouslySetInnerHTML={createMarkup(preview.snippet)}>
              </li>
            </div>
          )
      )}
    </div>
  )
}

export default App;