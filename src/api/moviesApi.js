import axios from 'axios'

export async function fetchMovies(title, apiKey) {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`)
    return response.data.Search
  } catch (error) {
    console.error(error)
    return []
  }
}
