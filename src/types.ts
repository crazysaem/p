export interface Chance {
  number: string;
  type: "Overworld" | "Rare";
}

export interface Weather {
  name: string;
  chance: Chance;
}

export interface Location {
  name: string;
  level: string;
  weatherTypes: Array<Weather>;
}

export interface Pokemon {
  name: string;
  galarIndex: string;
  search: string;
  locations: Array<Location>;
}
