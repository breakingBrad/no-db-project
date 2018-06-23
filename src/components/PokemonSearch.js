import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './PokemonSearch.css';
import Button from './Button';


function parseArr(arr, val) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i].stat.name === val) {
      return arr[i];
    }
  }
};


class PokemonSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: '',
      resultData: {},
      loading: true,
      pokemon: {},
    }
  }

  handleChange(value) {
    this.setState({ userInput: value, });
  }

  fetchPokemonData = (e, identifier) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(`Fetching Data For User Input: ${identifier}`);
    return axios.get(`http://localhost:3004/pokemon/${identifier}`)
      .then(response => {
        this.setState({
          loading: false,
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
        },
          () => { this.props.updatefromPokemonSearch(this.state) });
        const pokemon = this.state.pokemon;
        console.log(pokemon);
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    return (
      <div className="search-area">
        <span>Search for a Pokémon by name or number.</span>
        <br />
        <input className="input-line" type="text" placeholder="Ex: Bulbasaur / 1" onChange={e => this.handleChange(e.target.value)} />
        <Button
          type="submit"
          className="search"
          onClick={e => this.fetchPokemonData(e, this.state.userInput, this.state.loading)} >
          Search
        </Button>
        <Button
          type="submit"
          className="search"
          onClick={e => this.fetchPokemonData(e, _.random(1, 802, false, this.state.loading))}>
          Random
        </Button>
      </div>

    );
  }

}

export default PokemonSearch;