import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import PokemonList from "./components/pokemonList/PokemonList";
import Pokemon from "./components/pokemon/Pokemon";

// Pokemon url - ALL = https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150
// Pokemon sprite = https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/<pokemon-id>.png
// Pokemon desc = https://pokeapi.co/api/v2/pokemon-species/<id> -> ["flavor_text_entries"][0]["flavor_text"]
// Add search function for pokemon, add all pokemon in array and search that array

function App() {
  return (
    <Router>
      <div className="App">
        <h3>PokeDex</h3>
        <Route exact path="/" render={() => <PokemonList />} />
        <Route exact path="/pokemon/:id" render={() => <Pokemon />} />
      </div>
    </Router>
  );
}

export default App;
