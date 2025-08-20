import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import css from "./App.module.css";

export default function App() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages || 1;

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const openModal = (movie: Movie) => setSearchMovie(movie);

  const closeModal = () => setSearchMovie(null);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      <MovieGrid onSelect={openModal} movies={data?.results ?? []} />

      {searchMovie && <MovieModal movie={searchMovie} onClose={closeModal} />}

      <Toaster position="top-right" />
    </div>
  );
}
