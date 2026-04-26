import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:3000/Movies'



export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
        const res = await fetch(BASE_URL)
        if (!res.ok) throw new Error('Failed to fetch. Is json-server running?')
        const data = await res.json()
        return data  
    }
)


export const addMovie = createAsyncThunk(
    'movies/addMovie',
    async (newMovie) => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovie),
        })
        if (!res.ok) throw new Error('Failed to add movie.')
        const data = await res.json()
        return data   
    }
)
export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async (id) => {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
        return id  
    }
)

export const updateMovie = createAsyncThunk(
    'movies/updateMovie',
    async ({ id, updatedMovie }) => {   
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedMovie),
        })
        if (!res.ok) throw new Error('Failed to update movie.')
        const data = await res.json()
        return data 
    }
)


const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        loading: false,
        error: null,
    },
    reducers: {}, 

 
    extraReducers: (builder) => {

       
        builder.addCase(fetchMovies.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.loading = false
            state.movies = action.payload  
        })
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

       
        builder.addCase(addMovie.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addMovie.fulfilled, (state, action) => {
            state.loading = false
            state.movies.push(action.payload)  
        })
        builder.addCase(addMovie.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        builder.addCase(deleteMovie.fulfilled, (state, action) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload)
        })

        builder.addCase(updateMovie.fulfilled, (state, action) => {
            const idx = state.movies.findIndex(movie => movie.id === action.payload.id)
            if (idx !== -1) state.movies[idx] = action.payload
        })
    }
})

export default moviesSlice.reducer