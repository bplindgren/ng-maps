import { GeographicLocation } from './geographicLocation';

export class User {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  token: string;
  location: GeographicLocation;
}
