import './Pokedex.css';
import Search from '../search/search';
export default function Pokedex() {
    return (
        <div className="pokedex-container">
            <h1 className="pokedex-title">POKEDEX</h1>
            <Search/>
        </div>
    );
}
