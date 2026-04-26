import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slices/MovieSlices.js'
import favoritesReducer from './slices/FavSlices.js'
const store = configureStore({
    reducer: {
        movies: moviesReducer,   
        favorites: favoritesReducer,  
    }
})

export default store