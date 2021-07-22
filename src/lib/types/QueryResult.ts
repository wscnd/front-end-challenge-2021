import type { Person } from './Person';

export interface QueryResult {
  results: Person[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}
