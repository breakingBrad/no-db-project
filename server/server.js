const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');
const axios = require('axios');
const app = express();

const pokemonParty = [];
const pokemonPartyIndex = pokemonParty.length;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../build'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.put (implement similiar to remove, add button on pokemon party to replace item with current selection).

app.get('/pokemon/:identifier', (req, res, next) => {
  const { identifier } = req.params;
  console.log(`Retreiving Pokemon Data For Pokemon: ${identifier}`);
  if (!identifier) {
    return res.status(400).send('You must provide an identifier to this endpoint');
  }
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${_.toLower(identifier)}`) // converting identifier to lowercase so api will accept
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err.response.data);
      res.status(500).send(_.get(err, 'response.data.detail', `Unable to find info for ${identifier}`));
    });
})


// ---- Pokemon Species Data GET ---- //
// app.get('/pokemon-species/:identifier', (req, res, next) => {
//   const { identifier } = req.params;
//   console.log(`Retreiving Pokemon-Species Data For Pokemon: ${identifier}`);
//   if (!identifier) {
//     return res.status(400).send('You must provide an identifier to this endpoint');
//   }
//   return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${_.toLower(identifier)}`) // converting identifier to lowercase so api will accept
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(err => {
//       console.log(err.response.data);
//       res.status(500).send(_.get(err, 'response.data.detail', `Unable to find info for ${identifier}`));
//     });
// })

app.get('/pokemon-party', (req, res, next) => {
  res.send(pokemonParty);
});

app.post('/pokemon-party', (req, res) => {
  const newPokemon = req.body;
  pokemonParty.push(newPokemon);
  console.log(`Adding New Pokemon to Party: ${newPokemon.name}`)
  res.send(pokemonParty);
});

app.delete('/pokemon-party/:id', (req, res) => {
  const { id } = req.params;
  const removedPokemon = pokemonParty.splice(id, 1)[0];
  console.log(`Removing Pokemon from Party at Index: ${id}`)
  res.send(pokemonParty);
  res.sendStatus(200);
});


const port = 3004;

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}`);
});