import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFavorite } from '../redux/slices/FavSlices'
import MovieCard from '../components/MovieCard'
import { Link } from 'react-router-dom'

const Favorites = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favorites)

    const handleDelete = (id) => {
        dispatch(removeFavorite(id))
    }

    return (
        <div style={styles.page}>
            <h1>❤️ My Favorites</h1>

            {favorites.length === 0 ? (
                <div style={styles.empty}>
                    <p style={styles.emptyText}>No favorites yet!</p>
                    <Link to="/" style={styles.browseBtn}>← Browse Movies</Link>
                </div>
            ) : (
                <div style={styles.grid}>
                    {favorites.map(movie => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            onDelete={handleDelete}  
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const styles = {
    page: { padding: '20px 40px', background: '#f5f5f5', minHeight: '100vh' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    empty: { textAlign: 'center', marginTop: '80px' },
    emptyText: { fontSize: '1.2rem', color: 'gray', marginBottom: '16px' },
    browseBtn: {
        padding: '10px 24px', background: 'violet', color: 'white',
        borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold',
    }
}

export default Favorites