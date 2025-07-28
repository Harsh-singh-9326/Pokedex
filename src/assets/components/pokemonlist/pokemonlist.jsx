import axios from "axios"
import { useEffect, useState } from "react"


export default function Pokemonlist (){
    const [isloading , setisloading] = useState(true);

    async function  getpokemon() {
        const response =  await axios.get("https://pokeapi.co/api/v2/pokemon")
        console.log(response.data)
        setisloading(false)

    }
    useEffect(()=>{
        getpokemon()
        

    },[])

    return (
        <div>
         Pokemon list
         <br />
         {isloading?"loading.....":"downloaded data"}
         

        </div>
    )
}