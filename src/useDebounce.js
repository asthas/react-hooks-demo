import {useEffect, useState} from 'react'

function useDebounce(val, delay){
  const [debouncedValue, setDebouncedValue] = useState(val)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(val)
    }, delay)

    return () => clearTimeout(handler)
  }, [val, delay])

  return debouncedValue
}
export default useDebounce;