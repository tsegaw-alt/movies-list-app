import { defineStore } from 'pinia'
import { fetchMovies } from '../api/moviesApi'

export const useMovieStore = defineStore({
  id: 'movie',
  state: () => ({
    movies: [],
    loading: true,
    apiKey: '4fa9b78b',
    title: 'batman'
  }),
  actions: {
    async fetchMovies() {
      this.loading = true
      const movies = await fetchMovies(this.title, this.apiKey)
      this.movies = movies
      this.loading = false
    }
  }
})
