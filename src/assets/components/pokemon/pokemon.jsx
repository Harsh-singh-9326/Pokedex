
import React from "react";
import "./pokemon.css"; 

export default function Pokemon({ name, image, type }) {
  return (
    <div className="pokemon-card">
      <img src={image} alt={name} className="pokemon-image" />
      <div className="pokemon-info">
        <h2 className="pokemon-name">{name}</h2>
        <div className="pokemon-type">{type}</div>
      </div>
    </div>
  );
}
