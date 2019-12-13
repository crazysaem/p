export interface Location {
  name: string;
  level: string;
  chance: string;
  weatherTypes: Array<string>;
}

export interface Pokemon {
  //galarIndex: number;
  name: string;
  encounter: string;
  locations: Array<Location>;
}
