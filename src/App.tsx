import React, { useState } from "react";
import "./App.css";
import { Pokemon } from "./types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";

const App = (props: { pokemons: Array<Pokemon> }) => {
  const [index, setIndex] = useState(-1);

  const pokemon = index >= 0 ? props.pokemons[index] : undefined;

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
      {pokemon && (
        <>
          <h3>Beschreibung</h3>
          <Paper>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Galar Index</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{pokemon.galarIndex}</TableCell>
                  <TableCell>{pokemon.name}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <h3>Standorte</h3>
          <Paper>
            <List>
              {pokemon.locations.map((location, i) => (
                <>
                  <ListItem key={i} alignItems="flex-start">
                    <ListItemText
                      primary={`${location.name}, Lvl: ${location.level}`}
                      secondary={
                        <span>
                          {location.weatherTypes.map(weather => (
                            <Chip key={weather} label={weather} />
                          ))}
                        </span>
                      }
                    />
                  </ListItem>
                  {i < pokemon.locations.length - 1 && <Divider />}
                </>
              ))}
            </List>
          </Paper>
        </>
      )}
    </div>
  );
};

export default App;
