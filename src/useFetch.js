import { useState, useEffect } from 'react';

function useFetch(url) {

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
  }, [url])

  return data;
}

export default useFetch;