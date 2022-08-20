import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

function useCars() {
  const { data, error } = useSWR('api/cars', fetcher)
  return { cars: data, isLoading: !error && !data, isError: error }
}

export default useCars
