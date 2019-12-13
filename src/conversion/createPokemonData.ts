import overworld from "../raw/Encounters_Overworld_Sword";
import rare from "../raw/Encounters_Rare_Sword";
import { Pokemon } from "../types";

export default (pokemons: Map<string, Pokemon>, isOverworld: boolean) => {
  const locationRegex = /[0-9]+ - ([A-Za-z].*)\:/;
  const weatherLevelRegex = /([A-Za-z ]*) \(Lv\. ([0-9]+\-[0-9]+)\)\:/;
  const pokemonRegex = /\t\t- ([A-Z][a-z]+).*([0-9]{2})%/;

  const lines = isOverworld ? overworld.split("\n") : rare.split("\n");

  let locationName = "";
  let weatherType = "";
  let level = "";

  for (const line of lines) {
    const locationResult = locationRegex.exec(line);
    if (!!locationResult) {
      locationName = locationResult[1];
    }

    const weatherLevelResult = weatherLevelRegex.exec(line);
    if (!!weatherLevelResult) {
      weatherType = weatherLevelResult[1];
      level = weatherLevelResult[2];
    }

    const pokemonResult = pokemonRegex.exec(line);
    if (!!pokemonResult) {
      const pokemonName = pokemonResult[1];
      const pokemonChance = pokemonResult[2];

      const pokemon = pokemons.get(pokemonName);
      if (!!pokemon) {
        const location = pokemon.locations.find(
          location => location.name === locationName
        );
        if (!!location) {
          location.weatherTypes.push(weatherType);
        } else {
          pokemon.locations.push({
            name: locationName,
            level,
            chance: `${pokemonChance}%`,
            weatherTypes: [weatherType]
          });
        }
      } else {
        pokemons.set(pokemonName, {
          name: pokemonName,
          encounter: isOverworld ? "overworld" : "rare",
          locations: [
            {
              name: locationName,
              level,
              chance: pokemonChance,
              weatherTypes: [weatherType]
            }
          ]
        });
      }
    }
  }
};
