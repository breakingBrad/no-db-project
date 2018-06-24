import React, { Component } from 'react';
import Button from './Button';
import './PokemonDisplay.css';
class PokemonDisplay extends Component {

  render() {
    return (
      <table className="display">
        <th><h3>Pokémon:</h3></th>
        <th><h3>Pokémon Party:</h3></th>
        <tr>
          <td>
            <ul className="pokemon-list">
              <li className="pokemon-info-header">{!this.props.pokemon.id == '' ? this.props.pokemon.id + '—' + this.props.pokemon.name : ''}</li>
              <img className="result-pokemon-image" src={this.props.pokemon.sprite} alt="" />
              <li><strong>Type:</strong> {!this.props.pokemon.typeTwo ? this.props.pokemon.typeOne : `${this.props.pokemon.typeOne} &  ${this.props.pokemon.typeTwo}`}</li>
              <br />
              <li><strong>Attack:</strong> {this.props.pokemon.hp.base_stat}</li>
              <li><strong>Defense:</strong> {this.props.pokemon.defense.base_stat}</li>
              <li><strong>Special-Attack:</strong> {this.props.pokemon.specialAttack.base_stat}</li>
              <li><strong>Special-Defense:</strong> {this.props.pokemon.specialDefense.base_stat}</li>
              <li><strong>Speed:</strong> {this.props.pokemon.speed.base_stat}</li><br />
              <li><strong>Height:</strong> {!this.props.pokemon.height == '' ? this.props.pokemon.height + 'm' : ''}</li>
              <li><strong>Weight:</strong> {!this.props.pokemon.weight == '' ? this.props.pokemon.weight + 'kg' : ''}</li>
              <li><strong>Base Exp:</strong> {this.props.pokemon.baseExperience}</li>
              <li>
                <Button
                  type="submit"
                  onClick={e => this.props.addToPartyFn(e, this.props.pokemon, this.props.pokemonPartyIndex)} >
                  Add To Party
              </Button>
              </li>
            </ul>
          </td>
          <td>
            <ul className="pokemon-party-list">
              {this.props.pokemonParty.map((pokemonParty, i) => (
                <li
                  key={`pokemonParty-${i}`}>
                  <img className="pokemon-party-img" src={pokemonParty.sprite} alt="" />
                  {pokemonParty.name} | Party Slot: {i + 1}
                  <br />
                  <Button
                    type="submit"
                    onClick={e => this.props.removeFromPartyFn(e, i)} >
                    Remove
            </Button>
                  <Button
                    type="submit"
                    onClick={e => this.props.updatePartyFn(e, i, this.props.pokemon)} >
                    Replace with Current Pokémon
            </Button>
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </table >
    );
  }
}

export default PokemonDisplay;