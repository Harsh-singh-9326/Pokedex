import './Pokedex.css';
import Search from '../search/search';
import { Link } from 'react-router-dom';
export default function Pokedex() {
    return (
        <div className="pokedex-container">
            <h1 className="pokedex-title">
                <Link to="/">POKEDEX</Link>
            </h1>
            <Search/>
        </div>
    );
}
