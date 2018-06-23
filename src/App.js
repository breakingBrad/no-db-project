import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './components/pokeball-header.png';
import Header from './components/Header';
import PokemonSearch from './components/PokemonSearch'
import Button from './components/Button';
import Alert from './components/Alert';

import './App.css';
var randomPokemon = _.random(1, 151, false);
function parseArr(arr, val) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].stat.name === val) {
      return arr[i];
    }
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userInput: '',
      resultData: {},
      partyIsFull: false,
      pokemonParty: [],
      pokemonPartyIndex: '',
      alert: false,
      pokemon: {
        id: '',
        name: '',
        weight: '',
        height: '',
        sprite: '',
        baseExperience: '',
        stats: [],
        typeOne: '',
        typeTwo: '',
        hp: {},
        attack: {},
        defense: {},
        speed: {},
        specialAttack: {},
        specialDefense: {},
      },
    }
  }
  updatefromPokemonSearch = (searchResults) => {
    this.setState({
      resultData: searchResults.resultData,
      pokemon: searchResults.pokemon,
      loading: searchResults.loading,
    })
  }

  componentDidMount() {
    console.log(`Fetching Random Pokemon on Page Load, Id: ${randomPokemon}`);
    axios.get(`http://localhost:3004/pokemon/${randomPokemon}`)
      .then(response => {
        this.setState({
          loading: false,
          userInput: '',
          resultData: response.data,
          pokemon: {
            id: '#' + response.data.id,
            name: _.upperFirst(response.data.name),
            weight: response.data.weight / 10,
            height: response.data.height / 10,
            sprite: response.data.sprites.front_default,
            baseExperience: response.data.base_experience,
            stats: response.data.stats,
            typeOne: _.upperFirst(response.data.types.reverse()[0].type.name),
            typeTwo: _.upperFirst(response.data.types.length > 1 ? response.data.types[1].type.name : null),
            hp: parseArr(response.data.stats, 'hp'),
            attack: parseArr(response.data.stats, 'attack'),
            defense: parseArr(response.data.stats, 'defense'),
            speed: parseArr(response.data.stats, 'speed'),
            specialAttack: parseArr(response.data.stats, 'special-attack'),
            specialDefense: parseArr(response.data.stats, 'special-defense'),
          }
        });
        const pokemon = this.state.pokemon;
        console.log(pokemon);
      })
    console.log('Fetching Pokemon Party on Page Load');
    return axios.get('http://localhost:3004/pokemon-party/')
      .then(response => {
        this.setState({
          pokemonParty: [
            ...response.data
          ],
          pokemonPartyIndex: response.data.length,
        });
        console.log(`Pokemon Party: ${response.data}`)
        console.log(`Pokemon Party Index: ${this.response.data.length}`)
      })
      .catch(err => {
      });
  }

  addToParty = (e, pokemon, index) => {
    e.preventDefault();
    if (this.state.pokemonParty.length >= 6) {
      return this.setState({ alert: true });
    } else
      console.log(`Adding Pokemon to Party: ${pokemon.name} at Party Slot: ${index + 1} (Index: ${index})`);
    return axios.post('http://localhost:3004/pokemon-party', pokemon, index)
      .then(response => {

        this.setState({
          pokemonParty: response.data,
          pokemonPartyIndex: response.data.length,
        });
      })
      .catch(err => {
        console.warn('Pokémon couldn\'t be added to the party.');
        console.info(err);
        throw err;
      })
  }

  removeFromParty = (e, index) => {
    e.preventDefault();
    console.log(`Removing Pokemon From Party at Party Slot: ${index + 1} (Index: ${index})`)
    axios.delete('http://localhost:3004/pokemon-party/' + index)
      .then(response => {
        this.setState({
          pokemonParty: this.state.pokemonParty.filter((pokemon, i) => i !== index),
          pokemonPartyIndex: response.data.length,
        });
      });
  }

  closeAlertModal = (e) => {
    this.setState({
      alert: false,
    });
  }

  render() {
    return (
      <div className="app">
        <Header>
          Pokémon Search
        </Header>
        <PokemonSearch updatefromPokemonSearch={this.updatefromPokemonSearch} />
        <br />
        <div className="pokemon-display-card">
          <h3>Pokémon:</h3>
          { !this.state.loading ? (
            <ul className="pokemon-list">
              <li className="pokemon-info-header">{this.state.pokemon.id} — {this.state.pokemon.name}</li>
              <img className="result-pokemon-image" src={this.state.pokemon.sprite} alt="" />
              <li><strong>Type:</strong> {!this.state.pokemon.typeTwo ? this.state.pokemon.typeOne : `${this.state.pokemon.typeOne} &  ${this.state.pokemon.typeTwo}`}</li>
              <br />
              <li><strong>HP:</strong> {this.state.pokemon.hp.base_stat}</li>
              <li><strong>Attack:</strong> {this.state.pokemon.attack.base_stat}</li>
              <li><strong>Defense:</strong> {this.state.pokemon.defense.base_stat}</li>
              <li><strong>Special-Attack:</strong> {this.state.pokemon.specialAttack.base_stat}</li>
              <li><strong>Special-Defense:</strong> {this.state.pokemon.specialDefense.base_stat}</li>
              <li><strong>Speed:</strong> {this.state.pokemon.speed.base_stat}</li>
              <br />
              <li><strong>Height:</strong> {this.state.pokemon.height} m</li>
              <li><strong>Weight:</strong> {this.state.pokemon.weight} kg</li>
              <li><strong>Base Exp:</strong> {this.state.pokemon.baseExperience}</li>
              <li>
                <Button
                  type="submit"
                  onClick={e => this.addToParty(e, this.state.pokemon, this.state.pokemonPartyIndex)} >
                  Add To Party
                  </Button>
              </li>
            </ul>
          ) : 'Loading . . .'}
          {/* <table>
          <tr><th></th><td colspan="2">{this.state.pokemon.id} — {this.state.pokemon.name}</td></tr>
          <tr><td colspan="2"><img className="result-pokemon-image" src={this.state.pokemon.sprite} alt="" /></td></tr>
          <tr><th>Type</th><td>{!this.state.pokemon.typeTwo ? this.state.pokemon.typeOne : `${this.state.pokemon.typeOne} &  ${this.state.pokemon.typeTwo}`}</td></tr>
          <tr><th>Height</th><td>{this.state.pokemon.height}</td></tr>
          <tr><th>Weight</th><td>{this.state.pokemon.weight}</td></tr>
          <tr><th>Base Exp:</th><td>{this.state.pokemon.baseExperience}</td></tr>
          </table> */}
        </div>
        <div className="pokemon-party">
          <h3>
            Pokémon Party:
          </h3>
          <ul>
            {this.state.pokemonParty.map((pokemonParty, i) => (
              <li
                key={`pokemonParty-${i}`}>
                {pokemonParty.name} | Party Slot: {i + 1}
                <Button
                  type="submit"
                  onClick={e => this.removeFromParty(e, i)} >
                  Remove
            </Button>
              </li>
            ))}
          </ul>
        </div>
        {this.state.alert ? <Alert closeAlertModal={this.closeAlertModal} /> : null}
      </div>
    );
  }
}
export default App;
