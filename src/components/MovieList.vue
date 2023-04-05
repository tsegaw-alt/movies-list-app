<template>
  <div class="py-12">
    <div class="max-w-screen-lg mx-auto">
      <h1 class="text-5xl font-bold tracking-wider text-center my-8">Movie List</h1>
      <div
        v-if="loading"
        class="flex justify-center items-center text-center text-gray-500 text-xl font-bold my-8"
      >
        <div class="loader mr-2"></div>
        <span>Loading...</span>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="movie in movies" :key="movie.imdbID">
          <div class="bg-white rounded-lg shadow-lg p-4 relative">
            <img
              :src="movie.Poster"
              alt="Movie Poster"
              class="w-full h-64 object-cover transition duration-300 ease-in-out transform hover:translate-y-1 hover:scale-105 rounded-t-lg"
            />
            <div class="mt-2">
              <h2 class="text-lg font-bold leading-tight text-gray-900 truncate">
                {{ movie.Title }}
              </h2>
              <p class="text-base leading-tight text-gray-500">{{ movie.Year }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useMovieStore } from '../stores/movieStore'

const movieStore = useMovieStore()

const loading = computed(() => movieStore.loading)
const movies = computed(() => movieStore.movies)

onMounted(() => {
  movieStore.fetchMovies()
})
</script>

<style>
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
