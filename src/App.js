import React, { useState } from 'react';
import useFetch from './useFetch';
import './App.css';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let articles = useFetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${searchTerm}`)
  return(
    <div>
      <input
        type="search"
        onInput={(e) => setSearchTerm(e.target.value)}
      />
      {articles.map((article,i) => (
        <li key={i}>{article}</li>
      ))}
    </div>
  )
}

export default App;
