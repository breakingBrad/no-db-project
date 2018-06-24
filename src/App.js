import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './components/pokeball-header.png';
import Header from './components/Header';
import Footer from './components/Footer';
import PokemonSearch from './components/PokemonSearch'
import Alert from './components/Alert';
import PokemonDisplay from './components/PokemonDisplay';
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
    this.fetchData()
  }

  fetchData = (e, identifier) => {
    console.log(`Fetching Random Pokemon on Page Load, Id: ${randomPokemon}`);
    axios.get(`/pokemon/${randomPokemon}`)
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
    return axios.get('/pokemon-party/')
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
      console.log(`Adding Pokemon to Party: ${pokemon.name} at Party Slot: ${+index + 1} (Index: ${index})`);
    return axios.post('/pokemon-party', pokemon, index)
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
    axios.delete('/pokemon-party/' + index)
      .then(response => {
        this.setState({
          pokemonParty: this.state.pokemonParty.filter((pokemon, i) => i !== index),
          pokemonPartyIndex: response.data.length,
          alert: false,
        });
      });
  }

  updatePartyWithCurrentResult = (e, index, pokemon) => {
    e.preventDefault();
    console.log(`Replacing Pokemon From Party at Party Slot: ${index + 1} (Index: ${index} with Pokemon from Results)`)
    axios.put('/pokemon-party/' + index, pokemon)
      .then(response => {
        this.setState({
          pokemonParty: response.data,
          pokemonPartyIndex: response.data.length,
          alert: false,
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
        <Header className="header">
          Pokémon Search
        </Header>
        <div className="wrapper">
          <PokemonSearch
            className="search"
            fetchPokemon={this.fetchPokemon} updatefromPokemonSearch={this.updatefromPokemonSearch} />
          <PokemonDisplay
            className="display"
            addToPartyFn={this.addToParty} removeFromPartyFn={this.removeFromParty} updatePartyFn={this.updatePartyWithCurrentResult}
            pokemon={this.state.pokemon} pokemonPartyIndex={this.state.pokmeonPartyIndex} pokemonParty={this.state.pokemonParty} loading={this.state.loading}
          />
        </div>
        <br /> {this.state.alert ? <Alert closeAlertModal={this.closeAlertModal} /> : null}
        <Footer className="footer">© Brad Van Orman 2018</Footer>
      </div >
    );
  }
}
export default App;
