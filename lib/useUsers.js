import useSWR from 'swr'
import axios from 'axios'

const fetcher = (url) => axios.get(url).then((res) => res.data)

function useUsers() {
  const { data, error } = useSWR('api/auth/users', fetcher)
  return { cars: data, isLoading: !error && !data, isError: error }
}

export default useUsers
