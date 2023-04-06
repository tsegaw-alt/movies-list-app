import axios from 'axios'

export async function fetchMovies(query, apiKey) {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?${query}&apikey=${apiKey}`)
    if (response.data.Error) {
      return []
    }
    return response.data.Search
  } catch (error) {
    console.error(error)
    return []
  }
}
