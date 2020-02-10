import { useState, useEffect } from 'react';

const defaultData = []

function useFetchAllRequests(urls) {
  const [fetchedData, setFetchedData] = useState(defaultData)

  useEffect(() => {
    const fetchArr = urls.map(function(url) {
      return fetch(url);
    })
    const fetchAllUrls = () => Promise.all(fetchArr).then(function(response){
      const responses = response.map((res) => res.json())
      return Promise.all(responses)
    }).then((data) => setFetchedData(data))
    fetchAllUrls()
  }, [urls])

  return fetchedData

}

export default useFetchAllRequests