import { createContext, useContext, useEffect, useState } from 'react';
const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        fetch('http://localhost:3000/Movies')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch. Is json-server running?');
                return res.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    
    const addMovie = (newMovie) => {
        return fetch('http://localhost:3000/Movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMovie),
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to add movie. Is json-server running?');
                return res.json();
            })
            .then(saved => {
                setMovies(prev => [...prev, saved]);
            });
    };


    const deleteMovie = (id) => {
        return fetch(`http://localhost:3000/Movies/${id}`, {
            method: "DELETE",
        }).then(() => {
            setMovies(prev => prev.filter(movie => movie.id !== id));
        });
    };

    const updateMovie = (id, updatedMovie) => {
        return fetch(`http://localhost:3000/Movies/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedMovie),
        })
            .then(res => res.json())
            .then(data => {
                setMovies(prev =>
                    prev.map(movie => movie.id === id ? data : movie)
                );
            });
    };
    return (
        <MovieContext.Provider
            value={{
                movies,
                loading,
                error,
                addMovie,
                deleteMovie,
                updateMovie
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};