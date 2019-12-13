export interface Chance {
  number: string;
  type: "Overworld" | "Rare";
}

export interface Location {
  name: string;
  level: string;
  chances: Array<Chance>;
  weatherTypes: Array<string>;
}

export interface Pokemon {
  name: string;
  galarIndex: number;
  search: string;
  locations: Array<Location>;
}
