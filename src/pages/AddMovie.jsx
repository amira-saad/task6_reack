// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMovies } from '../context/MovieContext';

// const AddMovie = () => {
//     const navigate = useNavigate();
//     const { addMovie } = useMovies();

//     const [formData, setFormData] = useState({
//         Title: '',
//         Year: '',
//         imdbID: '',
//         Type: 'movie',
//         Poster: '',
//     });
//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setError(null);

//         addMovie(formData)
//             .then(() => {
//                 setSuccess(true);
//                 setTimeout(() => navigate('/'), 1500);
//             })
//             .catch(err => setError(err.message));
//     };

//     return (
//         <div style={styles.page}>
//             <h1 style={styles.heading}>🎬 Add New Movie</h1>

//             {success && <p style={styles.success}>✅ Movie added! Redirecting...</p>}
//             {error && <p style={styles.error}> {error}</p>}

//             <form onSubmit={handleSubmit} style={styles.form}>

//                 <div style={styles.field}>
//                     <label style={styles.label}>Title *</label>
//                     <input
//                         name="Title"
//                         value={formData.Title}
//                         onChange={handleChange}
//                         required
//                         placeholder="e.g. The Dark Knight"
//                         style={styles.input}
//                     />
//                 </div>

//                 <div style={styles.field}>
//                     <label style={styles.label}>Year *</label>
//                     <input
//                         name="Year"
//                         value={formData.Year}
//                         onChange={handleChange}
//                         required
//                         placeholder="e.g. 2008"
//                         maxLength={4}
//                         style={styles.input}
//                     />
//                 </div>

//                 <div style={styles.field}>
//                     <label style={styles.label}>IMDB ID *</label>
//                     <input
//                         name="imdbID"
//                         value={formData.imdbID}
//                         onChange={handleChange}
//                         required
//                         placeholder="e.g. tt0468569"
//                         style={styles.input}
//                     />
//                 </div>

//                 <div style={styles.field}>
//                     <label style={styles.label}>Type</label>
//                     <select name="Type" value={formData.Type} onChange={handleChange} style={styles.input}>
//                         <option value="movie">Movie</option>
//                         <option value="series">Series</option>
//                         <option value="episode">Episode</option>
//                     </select>
//                 </div>

//                 <div style={styles.field}>
//                     <label style={styles.label}>Poster URL</label>
//                     <input
//                         name="Poster"
//                         value={formData.Poster}
//                         onChange={handleChange}
//                         placeholder="https://..."
//                         style={styles.input}
//                     />
//                 </div>

//                 {formData.Poster ? (
//                     <div style={styles.previewWrapper}>
//                         <img src={formData.Poster} alt="Poster preview" style={styles.preview} />
//                     </div>
//                 ) : null}

//                 <div style={styles.btnRow}>
//                     <button type="button" style={styles.cancelBtn} onClick={() => navigate('/')}>
//                         Cancel
//                     </button>
//                     <button type="submit" style={styles.submitBtn}>
//                         Add Movie
//                     </button>
//                 </div>

//             </form>
//         </div>
//     );
// };

// const styles = {
//     page: { padding: '30px 40px', background: '#f5f5f5', minHeight: '100vh' },
//     heading: {
//         marginBottom: '24px',
//         color: '#222',
//         textAlign: 'center',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         gap: '10px'
//     },
//     form: {
//         background: '#fff', padding: '28px', borderRadius: '10px',
//         boxShadow: '0 2px 12px rgba(0,0,0,0.1)', maxWidth: '500px',
//         display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', margin: '0 auto'
//     },
//     field: { display: 'flex', flexDirection: 'column', gap: '6px' },
//     label: { fontWeight: 'bold', fontSize: '0.9rem', color: '#444' },
//     input: { padding: '10px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '0.95rem', outline: 'none' },
//     previewWrapper: { display: 'flex', justifyContent: 'center' },
//     preview: { width: '120px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' },
//     btnRow: { display: 'flex', gap: '12px', marginTop: '8px' },
//     submitBtn: { flex: 1, padding: '10px', background: 'violet', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' },
//     cancelBtn: { flex: 1, padding: '10px', background: '#eee', color: '#333', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' },
//     success: { color: 'green', fontWeight: 'bold', marginBottom: '12px' },
//     error: { color: 'red', marginBottom: '12px' },
// };

// export default AddMovie;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';      
import { addMovie } from '../redux/slices/MovieSlices.js';  

const AddMovie = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();                

    const [formData, setFormData] = useState({
        Title: '',
        Year: '',
        imdbID: '',
        Type: 'movie',
        Poster: '',
    });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await dispatch(addMovie(formData))     
            setSuccess(true);
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError(err.message)
        }
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.heading}>🎬 Add New Movie</h1>

            {success && <p style={styles.success}>✅ Movie added! Redirecting...</p>}
            {error && <p style={styles.error}> {error}</p>}

            <form onSubmit={handleSubmit} style={styles.form}>

                <div style={styles.field}>
                    <label style={styles.label}>Title *</label>
                    <input
                        name="Title"
                        value={formData.Title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. The Dark Knight"
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Year *</label>
                    <input
                        name="Year"
                        value={formData.Year}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 2008"
                        maxLength={4}
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>IMDB ID *</label>
                    <input
                        name="imdbID"
                        value={formData.imdbID}
                        onChange={handleChange}
                        required
                        placeholder="e.g. tt0468569"
                        style={styles.input}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Type</label>
                    <select name="Type" value={formData.Type} onChange={handleChange} style={styles.input}>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Poster URL</label>
                    <input
                        name="Poster"
                        value={formData.Poster}
                        onChange={handleChange}
                        placeholder="https://..."
                        style={styles.input}
                    />
                </div>

                {formData.Poster ? (
                    <div style={styles.previewWrapper}>
                        <img src={formData.Poster} alt="Poster preview" style={styles.preview} />
                    </div>
                ) : null}

                <div style={styles.btnRow}>
                    <button type="button" style={styles.cancelBtn} onClick={() => navigate('/')}>
                        Cancel
                    </button>
                    <button type="submit" style={styles.submitBtn}>
                        Add Movie
                    </button>
                </div>

            </form>
        </div>
    );
};

const styles = {
  page: {
    padding: "30px 40px",
    background: "linear-gradient(135deg, #eef2f3, #dfe9f3)",
    minHeight: "100vh"
  },

  heading: {
    marginBottom: "24px",
    color: "#2c3e50",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    fontSize: "2rem",
    fontWeight: "bold"
  },

  form: {
    background: "#ffffff",
    padding: "28px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    justifyContent: "center",
    margin: "0 auto"
  },

  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },

  label: {
    fontWeight: "600",
    fontSize: "0.95rem",
    color: "#34495e"
  },

  input: {
    padding: "10px 12px",
    border: "1px solid #dcdfe3",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    background: "#f9fafb",
    color: "#2c3e50"
  },

  previewWrapper: {
    display: "flex",
    justifyContent: "center"
  },

  preview: {
    width: "120px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
  },

  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "8px"
  },

  submitBtn: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(135deg, #56ab2f, #a8e063)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer"
  },

  cancelBtn: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(135deg, #bdc3c7, #dfe6e9)",
    color: "#2c3e50",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer"
  },

  success: {
    color: "#27ae60",
    fontWeight: "bold",
    marginBottom: "12px",
    textAlign: "center"
  },

  error: {
    color: "#e74c3c",
    marginBottom: "12px",
    textAlign: "center"
  }
};
export default AddMovie;