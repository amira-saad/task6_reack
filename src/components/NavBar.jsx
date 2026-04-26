import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";         

const NavBar = () => {
  const favorites = useSelector(state => state.favorites.favorites)  
  const favCount  = favorites.length                                 

  return (
    <div style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/add-movie" style={styles.link}>Add Movie</Link>
        <Link to="/favorites" style={{ ...styles.link, padding: "10px 15px" }}>
          Favorites
          {favCount > 0 && (                              
            <span style={styles.badge}>{favCount}</span>
          )}
        </Link>

        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/contact" style={styles.link}>Contact Us</Link>
      </div>
      <div style={styles.right}>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </div>

    </div>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    padding: "15px 30px",
    background: "linear-gradient(135deg, #ffffff, #f8fafc, #eef2f7)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    borderBottom: "1px solid #e5e7eb",
  },

  left: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    justifyContent: "center",
  },

  right: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    flexShrink: 0,
  },

  link: {
    color: "#334155",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    minWidth: "100px",
    textAlign: "center",
    position: "relative",
    display: "inline-block",
    transition: "0.3s",
  },

  badge: {
    position: "absolute",
    top: "-8px",
    right: "8px",
    background: "#3b82f6",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "11px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
export default NavBar;