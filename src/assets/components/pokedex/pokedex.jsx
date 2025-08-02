import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../search/search';
import './Pokedex.css';

export default function Pokedex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemon, setAllPokemon] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch Pokémon names once (e.g. limit = 100000 to cover all)
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
      .then(res => res.json())
      .then(data => {
        const names = data.results.map(p => p.name);
        setAllPokemon(names);
      })
      .catch(console.error);
  }, []);

  // ✅ When user types, filter suggestions. If searchTerm is empty → hide suggestions.
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSuggestions([]);
    } else {
      const filtered = allPokemon
        .filter(n => n.startsWith(term))
        // Optional: limit to first 10 items
        .slice(0, 10);
      setSuggestions(filtered);
    }
  }, [searchTerm, allPokemon]);

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title"><Link to="/">POKÉDEX</Link></h1>
      <Search value={searchTerm} onSearch={setSearchTerm} />

      {/* Only show suggestion list when user has typed something */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(name => (
            <li key={name} onClick={() => navigate(`/pokemon/${name}`)}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
