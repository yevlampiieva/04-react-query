import { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const img =
          movie.poster_path === null
            ? "/error_img.svg"
            : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        return (
          <li key={movie.id} onClick={() => onSelect(movie)}>
            <div className={css.card}>
              <img className={css.image} src={img} alt={movie.title} loading="lazy" />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
