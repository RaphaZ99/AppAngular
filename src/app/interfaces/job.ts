import { Person } from './person';
import { Sector } from './sector';

export interface Job {
  id?: number;
  name: string;
  sector: Sector;
}
