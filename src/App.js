import React, { useState, useEffect } from 'react';
import useFetch from './useFetch';
import './App.css';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let data = useFetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${searchTerm}`)
  return(
    <div>
      <input
        type="search"
        onInput={(e) => setSearchTerm(e.target.value)}
      />
      {data.map((d,i) => (
        <li key={i}>{d}</li>
      ))}
    </div>
  )
}

export default App;
