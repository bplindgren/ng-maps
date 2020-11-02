import { Coordinate } from './coordinate';

export class Point {
  constructor(coordinate: Coordinate, type: string) {
    this.coordinate = coordinate;
    this.type = type;
  }
  coordinate: Coordinate;
  type: string;
}
