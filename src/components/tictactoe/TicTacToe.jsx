import React, { Component } from 'react';
import classNames from 'classnames';

import { Game as TicTacToeGame } from '../../util/tictactoe/index';
import OMark from './OMark.jsx';
import XMark from './XMark.jsx';

import './TicTacToe.scss';

class TicTacToe extends Component {
  constructor() {
    super();
    this.game = new TicTacToeGame();
    this.state = {
      board: this.game.board,
      gameOver: false
    };
    this.handleChoosePosition = this.handleChoosePosition.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  handleChoosePosition(event) {
    const pos = event.currentTarget.getAttribute('data-position').split(',');
    if (!this.game.board[pos[0]][pos[1]] && !this.game.gameOver) {
      this.game.makeMove(pos);
      this.setState({ board: this.game.board }, () => {
        setTimeout(() => {
          if (this.game.gameOver) {
            this.setState({ gameOver: true });
          }
        }, 3000);
      });
    }
  }

  resetGame() {
    this.game = new TicTacToeGame();
    this.setState({
      board: this.game.board,
      gameOver: false
    });
  }

  renderMark(mark) {
    if (mark === 'x') {
      return <XMark className="ttt-mark--x" />;
    } else if (mark === 'o') {
      return <OMark className="ttt-mark--o" />;
    }
  }

  renderBoardBlocks() {
    const blocks = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        blocks.push(
          <div
            data-position={[i, j]}
            onClick={this.handleChoosePosition}
            className={classNames('ttt-block', {
              'ttt-block--selectable':
                !this.game.board[i][j] && !this.game.gameOver
            })}
            key={`${i}|${j}`}
          >
            {this.renderMark(this.game.board[i][j])}
          </div>
        );
      }
    }
    return blocks;
  }

  renderPlayAgainBtn() {
    return (
      <button className="ttt-board--btn" onClick={this.resetGame}>
        {'Play Again'}
      </button>
    );
  }

  renderWinMessage() {
    const mark = this.game.winner().mark === 'x' ? <XMark /> : <OMark />;
    return (
      <section className="ttt-board--message">
        {mark} won!
        {this.renderPlayAgainBtn()}
      </section>
    );
  }

  renderTieMessage() {
    return (
      <section className="ttt-board--message ttt-board--message-tie">
        Tie!
        {this.renderPlayAgainBtn()}
      </section>
    );
  }

  renderGameMessage() {
    if (this.game.humanWon || this.game.computerWon) {
      return this.renderWinMessage();
    }
    return this.renderTieMessage();
  }

  renderGame() {
    if (this.state.gameOver) {
      return this.renderGameMessage();
    }
    return this.renderBoardBlocks();
  }

  render() {
    const gameHeading = 'tic-tac-toe game with an AI';
    return (
      <div className="ttt">
        <h1 className="ttt-title">{gameHeading}</h1>
        <div className="ttt-board">
          <div className="ttt-board--wrapper">{this.renderGame()}</div>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
