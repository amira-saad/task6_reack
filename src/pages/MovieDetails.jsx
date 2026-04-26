import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/FavSlices";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  const movies   = useSelector(state => state.movies.movies)
  const loading  = useSelector(state => state.movies.loading)
  const favorites = useSelector(state => state.favorites.favorites)

  if (loading) return <p style={styles.status}>Loading...</p>;

  const movie = movies.find(m => m.imdbID === id);

  if (!movie) return <p style={styles.status}>Movie not found.</p>;

 
  const isFavorite = favorites.some(m => m.id === movie.id)

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id))  
    } else {
      dispatch(addFavorite(movie))          
    }
  }

  return (
    <div style={styles.page}>

      {/* top row — back button + favorite button */}
      <div style={styles.topRow}>
        <Link to="/" style={styles.backBtn}>← Back</Link>

        <button onClick={handleFavoriteToggle} style={{
          ...styles.favBtn,
          background: isFavorite ? '#e24b4a' : 'white',
          color: isFavorite ? 'white' : '#e24b4a',
        }}>
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>

      <div style={styles.content}>
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/260x380?text=No+Image"}
          alt={movie.Title}
          style={styles.poster}
        />

        <div style={styles.info}>
          <h1 style={styles.title}>
            {movie.Title}
            {isFavorite && <span style={{ marginLeft: 10, fontSize: '1.5rem' }}>❤️</span>}
          </h1>
          <p><strong>Year:</strong> {movie.Year}</p>
          <p><strong>Type:</strong> {movie.Type}</p>
          <p><strong>IMDb ID:</strong> {movie.imdbID}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: { padding: "30px 40px", background: "#f5f5f5", minHeight: "100vh" },
  topRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: "24px"
  },
  backBtn: {
    display: "inline-block", padding: "8px 18px", background: "violet",
    color: "#fff", borderRadius: "6px", textDecoration: "none", fontWeight: "bold",
  },
  favBtn: {
    padding: "8px 18px", border: "2px solid #e24b4a",
    borderRadius: "6px", fontWeight: "bold",
    cursor: "pointer", fontSize: "0.95rem", transition: "all 0.2s",
  },
  content: { display: "flex", gap: "32px", flexWrap: "wrap" },
  poster: { width: "260px", borderRadius: "10px", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" },
  info: { flex: 1, minWidth: "260px", display: "flex", flexDirection: "column", gap: "8px", lineHeight: "1.6" },
  title: { fontSize: "2rem", marginBottom: "12px" },
  status: { textAlign: "center", padding: "60px" },
};

export default MovieDetails;