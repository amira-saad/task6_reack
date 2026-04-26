// import React from 'react';
// import MovieCard from '../components/MovieCard';
// import { useMovies } from '../context/MovieContext';

// const Home = () => {
//     const { movies, loading, error } = useMovies();
//     const { deleteMovie } = useMovies();
//     return (
//         <div style={styles.page}>
//             <h1>🎬 Movies</h1>

//             {loading && <p>Loading movies...</p>}
//             {error && <p style={{ color: 'red' }}> {error}</p>}

//             <div style={styles.grid}>
//                 {movies.map(movie => (
//                     <MovieCard key={movie.imdbID} movie={movie} onDelete={deleteMovie} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     page: {
//         padding: '20px 40px',
//         background: '#f5f5f5',
//         minHeight: '100vh',
//     },
//     grid: {
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//         gap: '20px',
//         marginTop: '20px',
//     },
// };

// export default Home;
import React, { useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { useDispatch, useSelector } from 'react-redux';           
import { fetchMovies, deleteMovie } from '../redux/slices/MovieSlices';  

const Home = () => {
    const dispatch = useDispatch();

   
    const movies  = useSelector(state => state.movies.movies)
    const loading = useSelector(state => state.movies.loading)
    const error   = useSelector(state => state.movies.error)
    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteMovie(id))                              
    }

    return (
        <div style={styles.page}>
            <h1>🎬 Movies</h1>

            {loading && <p>Loading movies...</p>}
            {error && <p style={{ color: 'red' }}> {error}</p>}

            <div style={styles.grid}>
                {movies.map(movie => (
                    <MovieCard key={movie.imdbID} movie={movie} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: {
        padding: '20px 40px',
        background: '#f5f5f5',
        minHeight: '100vh',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
};

export default Home;