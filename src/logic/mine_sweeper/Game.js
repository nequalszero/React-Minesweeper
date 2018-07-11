import GameSettingsFactory from './GameSettingsFactory';
import Board from './Board';
import { BEGINNER, INTERMEDIATE, EXPERT } from './Difficulties';

class Game {
  static get difficulties() {
    return [ BEGINNER, INTERMEDIATE, EXPERT ];
  }

  constructor(difficulty) {
    this._gameSettings = GameSettingsFactory.build({ difficulty });
    this._apparentMinesRemaining = this._gameSettings.numMines;
    this._actualMinesRemaining = this._gameSettings.numMines;
    this._board = new Board({ gameSettings: this._gameSettings });
    this._board.setup();
  }

  get board() {
    return this._board;
  }

  get settings() {
    return this._gameSettings;
  }

  get gameWon() {
    return (
      this._actualMinesRemaining === 0 ||
      this._board.unrevealedTileCount === 0
    );
  }

  get gameLost() {
    return this._gameLost;
  }

  get inProgress() {
    return !this._gameWon && !this._gameLost;
  }

  get rawGrid() {
    return this._board.rawGrid;
  }

  get apparentMinesRemaining() {
    return this._apparentMinesRemaining;
  }

  reveal(coordinates) {
    if (!this.inProgress) return;
    const wasFlagged = this._isFlagged(coordinates);

    if (!this._board.reveal(coordinates)) {
      Object.defineProperty(this, '_gameLost', { value: true });
      return false;
    }

    this._updateRemainingMineCounts(coordinates, wasFlagged);
    return true;
  }

  flag(coordinates) {
    if (!this.inProgress) return;
    const wasFlagged = this._isFlagged(coordinates);
    this._board.flag(coordinates);
    this._updateRemainingMineCounts(coordinates, wasFlagged);
  }

  _updateRemainingMineCounts(coordinates, wasFlagged) {
    const isMine = this._isMine(coordinates);
    const isFlagged = this._isFlagged(coordinates);

    if (wasFlagged && !isFlagged) {
      if (isMine) this._apparentMinesRemaining += 1;
      this._actualMinesRemaining += 1;
    } else if (!wasFlagged && isFlagged) {
      if (isMine) this._apparentMinesRemaining -= 1;
      this._actualMinesRemaining -= 1;
    }
  }

  _isMine(coordinates) {
    return this._board.isMine(coordinates);
  }

  _isFlagged(coordinates) {
    return this._board.isFlagged(coordinates);
  }
}

export default Game;
