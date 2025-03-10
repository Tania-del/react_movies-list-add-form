/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);

  // console.log(movie)

  const onAdd = (movie: Movie) => {
    setMovies((prev) => ([...prev, movie]));
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie onAdd={onAdd} />
      </div>
    </div>
  );
};
