import { defineStore } from 'pinia'
import { fetchMovies } from '../api/moviesApi'

export const useMovieStore = defineStore({
  id: 'movie',
  state: () => ({
    movies: [],
    loading: true,
    apiKey: '4fa9b78b',
    query: 's=batman'
  }),
  actions: {
    async fetchMovies(query = this.query) {
      this.loading = true
      const movies = await fetchMovies(query, this.apiKey)
      this.movies = movies
      this.loading = false
    }
  }
})
