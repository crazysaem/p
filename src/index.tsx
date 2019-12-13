import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Pokemon } from "./types";
import createPokemonData from "./conversion/createPokemonData";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

let pokemons = new Map<string, Pokemon>();

const main = async () => {
  createPokemonData(pokemons, true);
  createPokemonData(pokemons, false);

  console.log(pokemons);
};

main();
