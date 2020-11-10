export class Point {
  constructor(type: string, coordinates: number[]) {
    this.type = type;
    this.coordinates = coordinates;
  }
  type: string;
  coordinates: number[];
}
