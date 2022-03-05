export enum Color {
  BLACK = 'BLACK',
  WHITE = 'WHITE',
}

export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

export enum CommandType {
  PLACE = 'PLACE',
  MOVE = 'MOVE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  REPORT = 'REPORT',
}

export class Pawn {
  constructor(
    public x: number,
    public y: number,
    public facingDirection: Direction,
    public color: Color,
    public isFirstMove: boolean = true
  ) {}
}
