import { useState, useEffect } from 'react';

function useFetch(url, defaultVal = []) {

  const [data, setData] = useState(defaultVal);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
  }, [url])

  return data;
}

export default useFetch;