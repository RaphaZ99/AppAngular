import { Address } from './address';

export interface Person {
  id?: number;
  cpf: string;
  name: string;
  socialName: string;
  birthday?: Date;
  rg: string;
  phoneNumber: string;
  mobileNumber: string;
  address: Address;
}
