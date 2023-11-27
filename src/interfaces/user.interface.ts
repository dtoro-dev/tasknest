import { ROLES } from '../constants/roles';

export interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  username: string;
  email: string;
  password: string;
  role: ROLES;
}
