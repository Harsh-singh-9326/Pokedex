
import React from "react";
import "./pokemon.css"; 
import { Link } from "react-router-dom";

export default function Pokemon({ name, image, type,id }) {
  return (
    <div className="pokemon-card">
      <Link to={`Pokemon/${id}`}>
      <img src={image} alt={name} className="pokemon-image" />
      <div className="pokemon-info">
        <h2 className="pokemon-name">{name}</h2>
        <div className="pokemon-type">{type}</div>
      </div>
      </Link>
    </div>
  );
}
