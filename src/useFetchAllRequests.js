import { useState, useEffect } from 'react';

const defaultData = []

function useFetchAllRequests(urls) {
  const [fetchedData, setFetchedData] = useState(defaultData)
  console.log({ fetchedData })

  useEffect(() => {
    const fetchArr = urls.map((url) => {
      url = 'https://cors-anywhere.herokuapp.com/' +
      'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=' +
      url
      return fetch(url);
    })
    const fetchAllUrls = () => Promise.all(fetchArr).then(function(response){
      const responses = response.map((res) => res.json())
      return Promise.all(responses)
    }).then((data) => {
      setFetchedData(data.map(d => d.query.search))
    })
    fetchAllUrls()
  }, [urls])
  return fetchedData

}

export default useFetchAllRequests