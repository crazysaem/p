import React, { useState } from "react";
import "./App.css";
import { Pokemon } from "./types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const App = (props: { pokemons: Array<Pokemon> }) => {
  const [index, setIndex] = useState(-1);

  return (
    <div className="App">
      <Autocomplete
        id="combo-box-demo"
        options={props.pokemons}
        getOptionLabel={(option: Pokemon) => option.search}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField {...params} label="Pokemon" variant="outlined" fullWidth />
        )}
        onChange={(_event, pokemon: Pokemon) => {
          setIndex(props.pokemons.indexOf(pokemon));
        }}
      />
      {index >= 0 && <div>{JSON.stringify(props.pokemons[index])}</div>}
    </div>
  );
};

export default App;
