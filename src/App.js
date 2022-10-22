import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import searchIcon from "./search.svg";
const API_URL = `http://www.omdbapi.com?apikey=686cb799`;
function App() {
  let [data, setData] = useState([]);
  let [title, setTitle] = useState(``);
  const searchMovie = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const json = await res.json();
    setData(json.Search);
  };
  useEffect(() => {
    searchMovie(title);
  }, []);

  return (
    <div className="app">
      <h1>movieLand</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a movie"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => {
            searchMovie(title)
          }}
        />
      </div>
      {data?.length > 0 ? (
        <div className="container">
          {data.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>no movies found</h2>
        </div>
      )}
    </div>
  );
}
export default App;
  