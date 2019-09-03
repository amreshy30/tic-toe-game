import Board from './Board.js';
import ComputerPlayer from './ComputerPlayer.js';
import HumanPlayer from './HumanPlayer.js';

class Game {
  constructor() {
    this.tttboard = new Board();
    this.humanPlayer = new HumanPlayer('x');
    this.computerPlayer = new ComputerPlayer('o');
    this.currentPlayer = this.humanPlayer;
  }

  get board() {
    return this.tttboard.board;
  }

  get humanWon() {
    return this.tttboard.won(this.humanPlayer.mark);
  }

  get computerWon() {
    return this.tttboard.won(this.computerPlayer.mark);
  }

  get gameOver() {
    return this.tttboard.gameOver();
  }

  winner() {
    return this.tttboard.winner(this);
  }

  makeMove(pos) {
    this.tttboard.placeMark(pos, this.currentPlayer);
    if (this.gameOver) {
      return;
    }
    if (this.currentPlayer === this.humanPlayer) {
      this.currentPlayer = this.computerPlayer;
      this.computerPlayer.choosePosition(this);
      this.currentPlayer = this.humanPlayer;
    }
  }
}

export default Game;
