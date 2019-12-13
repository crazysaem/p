export interface Location {
  name: string;
  level: string;
  chance: string;
  weatherTypes: Array<string>;
}

export interface Pokemon {
  name: string;
  galarIndex: number;
  locations: Array<Location>;
}
