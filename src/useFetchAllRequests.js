import { useState, useEffect, useMemo } from 'react';

function useFetchAllRequests(urls) {

  const [fetchedData, setFetchedData] = useState([])

  let fetchArr = useMemo(
    () =>
      urls.map(function(url) {
        return fetch(url);
      }),
    []
  )

  useEffect(() => {
    const fetchAllUrls = () => Promise.all(fetchArr).then(function(response){
      const responses = response.map((res) => res.json())
      return Promise.all(responses)
    }).then((data) => setFetchedData(data))
    fetchAllUrls()
  }, [fetchArr])

  return fetchedData

}

export default useFetchAllRequests