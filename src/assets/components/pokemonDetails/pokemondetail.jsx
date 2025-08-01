import "./pokemondetail.css"
import axios from "axios"
import { useEffect ,useState} from "react"
import { useParams } from "react-router-dom"
export default function Pokemondetail (){
    const [Pokemon ,setPokemon]=useState()
    const {id} = useParams()

    async function getpokemon(){
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        setPokemon({
            name :res.data.name,
            image :res.data.sprites.other.dream_world.front_default,
            types:res.data.types.map((t)=>t.type.name),
            height:res.data.height,
            weight:res.data.weight,
            experience:res.data.base_experience,
            abilities:res.data.abilities.map((a)=>a.ability.name),
            moves :res.data.moves.map((m)=>m.move.name),
            stats: res.data.stats.map((s) => ({
                name: s.stat.name,
                value: s.base_stat,
            }))
        })
    }

    useEffect(()=>{
        getpokemon()
    },[])

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
          <p>{Pokemon.moves.join(", ")}</p>
        </div>
        <div className="info-box">
          <h2>Stats</h2>
          <ul>
            {Pokemon.stats.map((s) => (
              <li key={s.name}>
                {s.name}: {s.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    )
}
