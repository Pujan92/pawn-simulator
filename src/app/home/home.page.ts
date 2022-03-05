import { Component } from '@angular/core';
import { Color, CommandType, Direction, Pawn } from '../app.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  CHESSBOARD_SIZE = 8;
  chessBoard;
  pawn: Pawn;
  command: string;

  constructor() {
    this.chessBoard = this.initializeChessboardSquares(this.CHESSBOARD_SIZE);
  }

  initializeChessboardSquares(size) {
    const board = new Array(size);
    for(let rowIndex=0; rowIndex<size; rowIndex++) {
      board[rowIndex] = new Array(size);
    }
    return board;
  }

  executeCommand(command: string) {
    const commandType = command.split(' ')[0];

    switch (commandType) {
      case CommandType.PLACE:
        const operdands = command.split(' ')[1].split(',');
        this.pawn = new Pawn(+operdands[0], +operdands[1], Direction[operdands[2]], Color[operdands[3]]);
        break;

      case CommandType.MOVE:
        const moveSteps = +command.split(' ')[1];
        if((this.pawn.isFirstMove && moveSteps > 2) || (!this.pawn.isFirstMove && moveSteps > 1)) {
          break;
        }
        this.pawn = this.movePawn(this.pawn, moveSteps);
        this.pawn.isFirstMove = false;
        break;

      case CommandType.LEFT:
        this.pawn.facingDirection = this.getLeftDirection(this.pawn.facingDirection);
        break;

      case CommandType.RIGHT:
        this.pawn.facingDirection = this.getRightDirection(this.pawn.facingDirection);
        break;

      case CommandType.REPORT:
        alert(`${this.pawn.x}, ${this.pawn.y}, ${this.pawn.facingDirection}, ${this.pawn.color}`);
        break;

      default:
        break;
    }
  }

  movePawn(p: Pawn, steps: number): Pawn {
    const pawn = {...p};
    switch (pawn.facingDirection) {
      case Direction.NORTH:
        if(pawn.y + steps < this.CHESSBOARD_SIZE) {
          pawn.y += steps;
        }
        break;

      case Direction.SOUTH:
        if(pawn.y - steps >= 0) {
          pawn.y -= steps;
        }
        break;

      case Direction.EAST:
        if(pawn.x + steps < this.CHESSBOARD_SIZE) {
          pawn.x += steps;
        }
        break;

      case Direction.WEST:
        if(pawn.x - steps >= 0) {
          pawn.x -= steps;
        }
        break;

      default:
        break;
    }

    return pawn;
  }

  getLeftDirection(currentDirection: Direction) {
    if(currentDirection === Direction.NORTH) { return Direction.WEST; }
    else if(currentDirection === Direction.WEST) { return Direction.SOUTH; }
    else if(currentDirection === Direction.SOUTH) { return Direction.EAST; }
    else if(currentDirection === Direction.EAST) { return Direction.NORTH; }
  }

  getRightDirection(currentDirection: Direction) {
    if(currentDirection === Direction.NORTH) { return Direction.EAST; }
    else if(currentDirection === Direction.EAST) { return Direction.SOUTH; }
    else if(currentDirection === Direction.SOUTH) { return Direction.WEST; }
    else if(currentDirection === Direction.WEST) { return Direction.NORTH; }
  }
}
