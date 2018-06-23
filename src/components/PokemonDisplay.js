import React from 'react';

const PokemonDisplay = (props) => {
  const pokemon = props;
  return (
    <div>
      <ul>
        <img src={props.sprite} alt="" />
        <li>Number: {props.id}</li>
        <li>Name: {(props.name)}</li>
        <li>Height: {props.height}</li>
        <li>Weight: {props.weight}</li>
        <li>Base Exp: {props.baseExperience}</li>
      </ul>
    </div>
  );
}

export default PokemonDisplay;