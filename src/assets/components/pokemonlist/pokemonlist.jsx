import "./pokemonlist.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Pokemon from "../pokemon/pokemon";

export default function Pokemonlist() {
  const [pokemonlist, setpokemonlist] = useState([]);
  const [isloading, setisloading] = useState(true);

  const [PokemonURl, setPokemonURl]=useState("https://pokeapi.co/api/v2/pokemon")

  const [prevUrl, setprevUrl] = useState("")
  const [NextUrl, setNextUrl] = useState("")


  async function getpokemon() {
    const response = await axios.get(PokemonURl);
    const PokemonResult = response.data.results;
     setNextUrl(response.data.next)
     setprevUrl(response.data.previous)
    const PokemonResultPromises = await PokemonResult.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const PokemonData = await axios.all(PokemonResultPromises);
    console.log(PokemonData);
    const res = PokemonData.map((pokedata) => {
      const pokemon = pokedata.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
        type: pokemon.types.map((t) => t.type.name).join(", "),
      };
    });
    console.log(res);

    setpokemonlist(res);

    setisloading(false);
  }
  useEffect(() => {
    getpokemon();
  }, [PokemonURl]);

  return (
    <div>
      <div>
        <h2 className="heading">Pokemon List</h2>
        {isloading
          ? "loading....."
          : pokemonlist.map((p) => (
              <Pokemon name={p.name} image={p.image} type={p.type} key={p.id} />
            ))}
      </div>
      <div className="button-group">
        <button disabled={!prevUrl} onClick={()=>{if (prevUrl) {
      setPokemonURl(prevUrl);
      window.scrollTo({ top: 0, behavior: "smooth" }); }}}>Prev</button>
        <button disabled={!NextUrl} onClick={()=>{if (NextUrl) {
      setPokemonURl(NextUrl);
      window.scrollTo({ top: 0, behavior: "smooth" }); }}}>Next</button>
      </div>
    </div>
  );
}

