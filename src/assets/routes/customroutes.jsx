import Pokemonlist from "../components/pokemonlist/pokemonlist" 
import Pokemondetail from "../components/pokemonDetails/pokemondetail"

import {Routes,Route} from "react-router-dom"

export default function Customroutes (){
    return (
        <>
        <Routes>
            <Route path="/" element={<Pokemonlist/>}/>
            <Route path="/pokemon/:id" element={<Pokemondetail/>}/>            
        </Routes>
        </>
    )
}