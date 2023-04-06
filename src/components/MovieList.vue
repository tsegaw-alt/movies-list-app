<template>
  <div class="bg-gray-100">
    <div class="max-w-screen-xl mx-auto py-12">
      <h1 class="text-5xl font-bold tracking-wider text-center mb-8">Movie List</h1>
      <form @submit.prevent="searchMovies" class="mx-auto mb-8">
        <div class="flex items-center justify-center">
          <div class="relative flex items-center mr-4">
            <input
              v-model="searchTitle"
              @focus="titleFocused = true"
              @blur="titleFocused = false"
              class="block w-full py-2 px-4 text-lg rounded-full bg-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search by Movie Title"
              required
            />
            <label
              class="absolute left-0 -top-2 text-gray-500 text-xs font-semibold"
              :class="{ 'text-blue-500': searchTitle !== '' || titleFocused }"
            >
              Movie Title
            </label>
          </div>
          <div class="relative flex items-center mr-4">
            <input
              v-model="searchYear"
              @focus="yearFocused = true"
              @blur="yearFocused = false"
              class="block w-full py-2 px-4 text-lg rounded-full bg-gray-200 placeholder-gray-400 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search by Release Year"
            />
            <label
              class="absolute left-0 -top-2 text-gray-500 text-xs font-semibold"
              :class="{ 'text-blue-500': searchYear !== '' || yearFocused }"
            >
              Release Year
            </label>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="movie in movies" :key="movie.imdbID" class="bg-white rounded-lg shadow-lg">
          <img
            :src="movie.Poster"
            alt="Movie Poster"
            class="w-full h-64 object-cover rounded-t-lg"
          />
          <div class="px-8 py-6">
            <h2 class="text-2xl font-bold mb-4">{{ movie.Title }}</h2>
            <p class="text-base mb-4">
              <span class="font-bold">Year:</span> {{ movie.Year }}
            </p>
            <p class="text-base">{{ movie.Plot }}</p>
          </div>
        </div>
      </div>
      <div
        v-if="loading"
        class="flex justify-center items-center text-center text-gray-500 text-xl font-bold my-8"
      >
        <div class="loader mr-2"></div>
        <span>Loading...</span>
      </div>
      <div v-if="!loading && movies.length === 0" class="text-center text-gray-500 text-xl font-bold my-8">
        No movies found.
      </div>
    </div>
  </div>
</template>





<script setup>
import { onMounted, computed, ref } from 'vue'
import { useMovieStore } from '../stores/movieStore'

const movieStore = useMovieStore()

const loading = computed(() => movieStore.loading)
const movies = computed(() => movieStore.movies)

const searchTitle = ref('')
const searchYear = ref('')

onMounted(() => {
  movieStore.fetchMovies()
})

const searchMovies = () => {
  let query = ''
  if (searchTitle.value.trim() !== '') {
    query += `s=${searchTitle.value}`
  }
  if (searchYear.value.trim() !== '') {
    query += `&y=${searchYear.value}`
  }
  movieStore.fetchMovies(query)
}
</script>

<style scoped>

@keyframes loader {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-left-color: #000;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: loader 0.8s linear infinite;
}
</style>
