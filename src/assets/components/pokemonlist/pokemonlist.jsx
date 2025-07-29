import axios from "axios"
import { useEffect, useState } from "react"
import Pokemon from "../pokemon/pokemon";


export default function Pokemonlist (){
    const [ pokemonlist,setpokemonlist ] = useState([]);
    const [isloading , setisloading] = useState(true);

    async function  getpokemon() {
        const response =  await axios.get("https://pokeapi.co/api/v2/pokemon")
        const PokemonResult = response.data.results 
        const PokemonResultPromises =await PokemonResult.map((pokemon)=>axios.get(pokemon.url))
        const PokemonData = await axios.all(PokemonResultPromises) 
        console.log(PokemonData)
        const res = PokemonData.map((pokedata)=>{
            const pokemon = pokedata.data
            return{
            id :pokemon.id,    
            name :pokemon.name,
            image: pokemon.sprites.other["official-artwork"].front_default,
            type :pokemon.types.map((t)=> t.type.name).join(", ")
            
        }
        })
        console.log(res)
        setpokemonlist(res)

        setisloading(false)

    }
    useEffect(()=>{
        getpokemon()
         

    },[])

    return (
        <div>
         <div>Pokemon list
         
         {isloading?"loading.....":pokemonlist.map((p)=><Pokemon name={p.name} image={p.image} type={p.type} key={p.id} />) }
         </div>
         <div>
            <button>Next</button>
            <button>Prev</button>
         </div>

        </div>
    )
}