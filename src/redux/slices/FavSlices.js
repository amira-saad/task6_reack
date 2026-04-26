import { createSlice } from '@reduxjs/toolkit'
const loadFavorites = () => {
    try {
        const saved = localStorage.getItem('favorites')
        return saved ? JSON.parse(saved) : []
    } catch {
        return []
    }
}
const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: loadFavorites(),   
    },
    reducers: {

      
        addFavorite: (state, action) => {
            const alreadyExists = state.favorites.find(m => m.id === action.payload.id)
            if (!alreadyExists) {
                state.favorites.push(action.payload)
                saveFavorites(state.favorites)
            }
        },

       
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(m => m.id !== action.payload)
            saveFavorites(state.favorites)
        },
    }
})

export const { addFavorite, removeFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer