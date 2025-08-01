import "./pokemondetail.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Pokemondetail() {
  const [Pokemon, setPokemon] = useState();
  const { id } = useParams();

  async function getpokemon() {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: res.data.name,
      image: res.data.sprites.other.dream_world.front_default,
      types: res.data.types.map((t) => t.type.name),
      height: res.data.height,
      weight: res.data.weight,
      experience: res.data.base_experience,
      abilities: res.data.abilities.map((a) => a.ability.name),
      moves: res.data.moves.map((m) => m.move.name),
      stats: res.data.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    });
  }

  useEffect(() => {
    getpokemon();
  }, []);

  if (!Pokemon) return <div>Loading...</div>; // ✅ Prevents crash

  return (
    <div className="pokemon-detail-container">
      <h1 className="pokemon-name">{Pokemon.name}</h1>
      <img src={Pokemon.image} className="pokemon-image" alt={Pokemon.name} />

      <div className="pokemon-info">
        <div className="info-box">
          <h2>Types</h2>
          <p>{Pokemon.types.join(", ")}</p>
        </div>
        <div className="info-box">
          <h2>Height</h2>
          <p>{Pokemon.height}</p>
        </div>
        <div className="info-box">
          <h2>Weight</h2>
          <p>{Pokemon.weight}</p>
        </div>
        <div className="info-box">
          <h2>Experience</h2>
          <p>{Pokemon.experience}</p>
        </div>
        <div className="info-box">
          <h2>Abilities</h2>
          <ul>
            {Pokemon.abilities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="info-box moves-box">
          <h2>Top Moves</h2>
          <p>
            {Pokemon.moves.slice(0, 20).map((move) => (
              <span key={move}>{move}</span>
            ))}
          </p>
        </div>

        <div className="info-box">
          <h2>Stats</h2>
          <div>
            {Pokemon.stats.map((s) => (
              <div className="stats-bar" key={s.name}>
                <div className="stats-bar-name">{s.name}</div>
                <div className="stats-bar-value">
                  <div
                    className="stats-bar-fill"
                    style={{
                      width: `${s.value > 100 ? 100 : s.value}%`,
                      backgroundColor: "#4caf50",
                    }}
                  ></div>
                  <span className="stats-bar-number">{s.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
