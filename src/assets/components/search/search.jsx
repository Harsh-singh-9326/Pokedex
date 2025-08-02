import './search.css';

export default function Search({ value, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search Pokémon…"
      value={value}
      onChange={e => onSearch(e.target.value)}
      className="search-input"
    />
  );
}

