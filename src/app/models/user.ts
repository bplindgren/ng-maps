import { GeographicLocation } from './geographicLocation';

export class User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  token: string;
  location: GeographicLocation;

  constructor(id, login, firstName, lastName, token, location) {
    this.id = id,
    this.login = login,
    this.firstName = firstName,
    this.lastName = lastName,
    this.token = token,
    this.location = location
  }
}
