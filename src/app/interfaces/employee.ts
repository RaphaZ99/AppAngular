import { Job } from './job';
import { Person } from './person';

export interface Employee {
  id?: number;
  contractStartDate: Date;
  contractEndDate?: Date;
  salary: number;
  person: Person;
  job: Job;
}
