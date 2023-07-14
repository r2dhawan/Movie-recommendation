import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOtherMovies, setShowOtherMovies] = useState(false);

  useEffect(() => {
    fetchMovieRecommendations();
  }, []);

  async function fetchMovieRecommendations() {
    const apiKey = 'c5ab47fa'; // Replace with your actual API key
    const url = `http://www.omdbapi.com/?s=action&apikey=${apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data.Search;
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      console.log('An error occurred while fetching movie recommendations:', error);
      setIsLoading(false);
    }
  }

  function toggleOtherMovies() {
    setShowOtherMovies(!showOtherMovies);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Movie Recommendations</h1>
      <div className="recommendations">
        {movies && movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID} className={`movie-card ${showOtherMovies ? 'show' : 'hide'}`}>
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title}</h3>
              <p>{movie.Plot}</p>
              <a
                href={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="button">IMDb</button>
              </a>
            </div>
          ))
        ) : (
          <div>No movie recommendations found.</div>
        )}
      </div>
      <a
        href="https://www.imdb.com/search/title/?genres=action"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="button">{showOtherMovies ? 'Hide Other Movies' : 'Show Other Movies'}</button>
      </a>
    </div>
  );
}

export default App;

