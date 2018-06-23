import React, { Component } from 'react';
import Button from './Button';
import './PokemonDisplay.css';
class PokemonDisplay extends Component {

  render() {
    return (
      <div className="display">
        <div className="pokemon-results">
          <h3>Pokémon:</h3>
          <ul className="pokemon-list">
            <li className="pokemon-info-header">{this.props.pokemon.id} — {this.props.pokemon.name}</li>
            <img className="result-pokemon-image" src={this.props.pokemon.sprite} alt="" />
            <li><strong>Type:</strong> {!this.props.pokemon.typeTwo ? this.props.pokemon.typeOne : `${this.props.pokemon.typeOne} &  ${this.props.pokemon.typeTwo}`}</li>
            <br />
            <li><strong>Attack:</strong> {this.props.pokemon.hp.base_stat}</li>
            <li><strong>Defense:</strong> {this.props.pokemon.defense.base_stat}</li>
            <li><strong>Special-Attack:</strong> {this.props.pokemon.specialAttack.base_stat}</li>
            <li><strong>Special-Defense:</strong> {this.props.pokemon.specialDefense.base_stat}</li>
            <li><strong>Speed:</strong> {this.props.pokemon.speed.base_stat}</li>
            <br />
            <li><strong>Height:</strong> {this.props.pokemon.height < 0 ? this.props.pokemon.height + 'm' : ''}</li>
            <li><strong>Weight:</strong> {this.props.pokemon.weight < 0 ? this.props.pokemon.weight + 'kg' : ''}</li>
            <li><strong>Base Exp:</strong> {this.props.pokemon.baseExperience}</li>
            <li>
              <Button
                type="submit"
                onClick={e => this.props.addToPartyFn(e, this.props.pokemon, this.props.pokemonPartyIndex)} >
                Add To Party
              </Button>
            </li>
          </ul>
        </div>
        <div className="pokemon-party" >
          <h3>
            Pokémon Party:
          </h3>
          <ul>
            {this.props.pokemonParty.map((pokemonParty, i) => (
              <li
                key={`pokemonParty-${i}`}>
                {pokemonParty.name} | Party Slot: {i + 1}
                <Button
                  type="submit"
                  onClick={e => this.props.removeFromPartyFn(e, i)} >
                  Remove
            </Button>
              </li>
            ))}
          </ul>
        </div >
      </div >
    );
  }
}

export default PokemonDisplay;