import overworld from "../raw/Encounters_Overworld_Sword";
import rare from "../raw/Encounters_Rare_Sword";
import { Pokemon } from "../types";

import {
  en as pokemonEn,
  de as pokemonDe,
  deGalarIndex
} from "../l10n/pokemonNames";
import { en as weatherEn, de as weatherDe } from "../l10n/weather";

export default (pokemons: Map<string, Pokemon>, isOverworld: boolean) => {
  const locationRegex = /[0-9]+ - ([A-Za-z].*)\:/;
  const weatherLevelRegex = /([A-Za-z ]*) \(Lv\. ([0-9]+\-[0-9]+)\)\:/;
  const pokemonRegex = /\t\t- ([A-Z][a-z]+)\s*([0-9]{2,3})%/;

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
      weatherType = weatherDe[weatherEn.indexOf(weatherType)];
      level = weatherLevelResult[2];
    }

    const pokemonResult = pokemonRegex.exec(line);
    if (!!pokemonResult) {
      let pokemonName = pokemonResult[1];
      pokemonName = pokemonDe[pokemonEn.indexOf(pokemonName)];
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
        const galarIndex = deGalarIndex.indexOf(pokemonName);

        pokemons.set(pokemonName, {
          name: pokemonName,
          galarIndex,
          locations: [
            {
              name: locationName,
              level,
              chance: `${pokemonChance}%`,
              weatherTypes: [weatherType]
            }
          ]
        });
      }
    }
  }
};
