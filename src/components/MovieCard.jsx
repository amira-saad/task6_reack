import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/FavSlices";

const MovieCard = ({ movie, onDelete }) => {
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.favorites.favorites)
  const isFavorite = favorites.some(m => m.id === movie.id)

  const handleFavoriteToggle = () => {
    if (isFavorite) dispatch(removeFavorite(movie.id))
    else dispatch(addFavorite(movie))
  }

  return (
    <div style={styles.card}>
      <img
        src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.Title}
        style={styles.poster}
      />

      <div style={styles.info}>
        <h3 style={styles.title}>{movie.Title}</h3>
        <p style={styles.year}>{movie.Year}</p>
        <p style={styles.type}>{movie.Type}</p>

        <div style={styles.grid}>

      
          <button onClick={handleFavoriteToggle} style={styles.favBtn}>
            {isFavorite ? ' Favorited' : '🤍 Favorite'}
          </button>

          <Link to={`/movie/${movie.imdbID}`} style={styles.detailsBtn}>
             Details
          </Link>

         
          <Link to={`/update-movie/${movie.id}`} style={styles.updateBtn}>
             Update
          </Link>

          <button onClick={() => onDelete(movie.id)} style={styles.deleteBtn}>
             Delete
          </button>

        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
  poster: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  info: {
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
    background: "#f9fafb",
  },
  title: { margin: 0, fontSize: "1rem", fontWeight: "bold", color: "#1f2937" },
  year:  { margin: 0, fontSize: "0.85rem", color: "#6b7280" },
  type:  { margin: 0, fontSize: "0.85rem", textTransform: "capitalize", color: "#6b7280" },

  // ── 2x2 grid container ──
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",   // 2 equal columns
    gap: "8px",
    marginTop: "10px",
  },

  // shared button base
  favBtn: {
    padding: "8px 6px", border: "none", borderRadius: "6px",
    background:  "linear-gradient(135deg, #e24b4a, #ff6b6b)",  // ← red, matches ❤️,
    color: "white", fontWeight: "bold", cursor: "pointer",
    fontSize: "0.8rem", textAlign: "center",
  },
  detailsBtn: {
    padding: "8px 6px", color: "white",
    textDecoration: "none", textAlign: "center",
    borderRadius: "6px", fontWeight: "bold",
    fontSize: "0.8rem",
     background: "linear-gradient(135deg, #8e2de2, #c471ed)",  // ← navbar color ✅
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  updateBtn: {
    padding: "8px 6px", color: "white",
    textDecoration: "none", textAlign: "center",
    borderRadius: "6px", fontWeight: "bold",
    fontSize: "0.8rem",
    background: "linear-gradient(135deg, #c471ed, #8e2de2)", 
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  deleteBtn: {
    padding: "8px 6px", color: "white",
    border: "none", borderRadius: "6px",
    fontWeight: "bold", cursor: "pointer",
    fontSize: "0.8rem", textAlign: "center",
     background: "linear-gradient(135deg, #ef4444, #dc2626)",  // ← red, danger color

  },
};

export default MovieCard;