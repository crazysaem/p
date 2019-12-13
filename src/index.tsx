import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Pokemon } from "./types";
import createPokemonData from "./conversion/createPokemonData";

let pokemons = new Map<string, Pokemon>();

createPokemonData(pokemons, true);
createPokemonData(pokemons, false);

let pokemonsArray: Array<Pokemon> = [];
pokemons.forEach(pokemon => pokemonsArray.push(pokemon));
pokemonsArray = pokemonsArray.sort((a, b) => {
  if (a.search < b.search) {
    return -1;
  }
  if (a.search > b.search) {
    return 1;
  }
  return 0;
});

ReactDOM.render(
  <App pokemons={pokemonsArray} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
