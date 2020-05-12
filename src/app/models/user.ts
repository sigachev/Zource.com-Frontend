import {Role} from './role';
export class User {
  id: number;
  username = '';
  password = '';
  firstName = '';
  lastName = '';
  email = '';
  tel = '';
  role: Role;
  token = '';
}
