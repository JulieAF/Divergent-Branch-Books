import "./pages.css";

export const BookGenreFilter = ({
  selectedGenre,
  setSelectedGenre,
  genres,
}) => {
  return (
    <article className="genre-select-container">
      <select
        className="genre-select"
        id="genre"
        value={selectedGenre}
        onChange={(event) => {
          setSelectedGenre(event.target.value);
        }}
      >
        <option value="0">Sort By Genre</option>
        {genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.label}
            </option>
          );
        })}
      </select>
    </article>
  );
};
