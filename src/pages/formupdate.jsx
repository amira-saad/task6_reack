// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useMovies } from "../context/MovieContext";

// const UpdateMovie = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const { movies, updateMovie } = useMovies();

//   const [formData, setFormData] = useState({
//     Title: "",
//     Year: "",
//     imdbID: "",
//     Type: "movie",
//     Poster: "",
//   });

//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     const movie = movies.find((m) => m.id == id);

//     if (movie) {
//       setFormData(movie);
//     }
//   }, [movies, id]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     updateMovie(id, formData).then(() => {
//       setSuccess(true);
//       setTimeout(() => navigate("/"), 1500);
//     });
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.box}>
//         <h1 style={styles.heading}>🎬 Update Movie</h1>

//         {success && <p style={styles.success}>Movie Updated Successfully!</p>}

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             name="Title"
//             value={formData.Title}
//             onChange={handleChange}
//             placeholder="Movie Title"
//             style={styles.input}
//           />

//           <input
//             name="Year"
//             value={formData.Year}
//             onChange={handleChange}
//             placeholder="Release Year"
//             style={styles.input}
//           />

//           <input
//             name="imdbID"
//             value={formData.imdbID}
//             onChange={handleChange}
//             placeholder="IMDb ID"
//             style={styles.input}
//           />

//           <input
//             name="Poster"
//             value={formData.Poster}
//             onChange={handleChange}
//             placeholder="Poster URL"
//             style={styles.input}
//           />

//           {formData.Poster && (
//             <img
//               src={formData.Poster}
//               alt="Poster"
//               style={styles.image}
//             />
//           )}

//           <div style={styles.btnRow}>
//             <button
//               type="button"
//               style={styles.cancelBtn}
//               onClick={() => navigate("/")}
//             >
//               Cancel
//             </button>

//             <button type="submit" style={styles.updateBtn}>
//               Update Movie
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "#f5f5f5",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: "20px",
//   },

//   box: {
//     background: "white",
//     padding: "30px",
//     borderRadius: "12px",
//     boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
//     width: "100%",
//     maxWidth: "450px",
//   },

//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//     color: "#333",
//   },

//   form: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px",
//   },

//   input: {
//     padding: "12px",
//     borderRadius: "8px",
//     border: "1px solid #ccc",
//     fontSize: "15px",
//     outline: "none",
//   },

//   image: {
//     width: "120px",
//     margin: "auto",
//     borderRadius: "8px",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
//   },

//   btnRow: {
//     display: "flex",
//     gap: "10px",
//     marginTop: "10px",
//   },

//   cancelBtn: {
//     flex: 1,
//     padding: "12px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#ddd",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },

//   updateBtn: {
//     flex: 1,
//     padding: "12px",
//     border: "none",
//     borderRadius: "8px",
//     background: "violet",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },

//   success: {
//     color: "green",
//     textAlign: "center",
//     marginBottom: "10px",
//     fontWeight: "bold",
//   },
// };

// export default UpdateMovie;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";       
import { updateMovie } from "../redux/slices/MovieSlices";          

const UpdateMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();                              

  const movies = useSelector(state => state.movies.movies)   

  const [formData, setFormData] = useState({
    Title: "",
    Year: "",
    imdbID: "",
    Type: "movie",
    Poster: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const movie = movies.find((m) => m.id == id);
    if (movie) {
      setFormData(movie);
    }
  }, [movies, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateMovie({ id, updatedMovie: formData }))  
    setSuccess(true);
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div style={styles.page}>
      <div style={styles.box}>
        <h1 style={styles.heading}>🎬 Update Movie</h1>

        {success && <p style={styles.success}>Movie Updated Successfully!</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            placeholder="Movie Title"
            style={styles.input}
          />

          <input
            name="Year"
            value={formData.Year}
            onChange={handleChange}
            placeholder="Release Year"
            style={styles.input}
          />

          <input
            name="imdbID"
            value={formData.imdbID}
            onChange={handleChange}
            placeholder="IMDb ID"
            style={styles.input}
          />

          <input
            name="Poster"
            value={formData.Poster}
            onChange={handleChange}
            placeholder="Poster URL"
            style={styles.input}
          />

          {formData.Poster && (
            <img src={formData.Poster} alt="Poster" style={styles.image} />
          )}

          <div style={styles.btnRow}>
            <button type="button" style={styles.cancelBtn} onClick={() => navigate("/")}>
              Cancel
            </button>
            <button type="submit" style={styles.updateBtn}>
              Update Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eaf4ff, #d6e8ff)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  box: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "460px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "22px",
    color: "#1e3a5f",
    fontSize: "1.8rem",
    fontWeight: "bold",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #c9ddf5",
    fontSize: "15px",
    outline: "none",
    background: "#f8fbff",
    color: "#1e3a5f",
  },

  image: {
    width: "120px",
    margin: "auto",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },

  btnRow: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  cancelBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
    color: "#1e3a5f",
    cursor: "pointer",
    fontWeight: "bold",
  },

  updateBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #2563eb, #60a5fa)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  success: {
    color: "#2563eb",
    textAlign: "center",
    marginBottom: "10px",
    fontWeight: "bold",
  },
};
export default UpdateMovie;