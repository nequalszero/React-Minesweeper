import PropTypes from 'prop-types';
import zeroSvg from '../../images/mine_sweeper/zero.svg';
import oneSvg from '../../images/mine_sweeper/one.svg';
import twoSvg from '../../images/mine_sweeper/two.svg';
import threeSvg from '../../images/mine_sweeper/three.svg';
import fourSvg from '../../images/mine_sweeper/four.svg';
import fiveSvg from '../../images/mine_sweeper/five.svg';
import sixSvg from '../../images/mine_sweeper/six.svg';
import sevenSvg from '../../images/mine_sweeper/seven.svg';
import eightSvg from '../../images/mine_sweeper/eight.svg';
import flagSvg from '../../images/mine_sweeper/flag.svg';
import uncoveredSvg from '../../images/mine_sweeper/uncovered.svg';
// import questionmarkSvg from '../../images/mine_sweeper/questionmark.svg';
import mineSvg from '../../images/mine_sweeper/mine.svg';
import falseFlag from '../../images/mine_sweeper/flagged_false.png';

const numberToSvgLookup = {
  '0': zeroSvg,
  '1': oneSvg,
  '2': twoSvg,
  '3': threeSvg,
  '4': fourSvg,
  '5': fiveSvg,
  '6': sixSvg,
  '7': sevenSvg,
  '8': eightSvg
};

class InvalidAssignmentError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, InvalidAssignmentError)
  }
}

class Tile {
  constructor(params) {
    PropTypes.checkPropTypes(Tile.propTypes, params, 'params', 'Tile')
    this._rowIdx = params.rowIdx;
    this._colIdx = params.colIdx;
    this._revealed = false;
    this._flagged = false;
    this._desc = `tile at (${this._rowIdx}, ${this._colIdx})`;
  }

  get numSurroundingMines() {
    return this._numSurroundingMines;
  }

  get isMine() {
    return this._isMine;
  }

  get revealed() {
    return this._revealed;
  }

  get flagged() {
    return this._flagged;
  }

  get losingTile() {
    return this._losingTile;
  }

  get flaggedFalse() {
    return this._flaggedFalse;
  }

  get coordinates() {
    return [this._rowIdx, this._colIdx];
  }

  get displayImage() {
    if (this._flaggedFalse) return falseFlag;
    if (this._flagged) return flagSvg;
    if (!this._revealed) return uncoveredSvg;
    if (this._revealed && this._isMine) return mineSvg;
    // if (this._isMine) return mineSvg;
    return numberToSvgLookup[this._numSurroundingMines.toString()];
  }
  // get displayImage() {
  //   // if (!this._revealed) return uncoveredSvg;
  //   if (this._flagged) return flagSvg;
  //   if (this._isMine) { return mineSvg }
  //   // if (this._isMine) return mineSvg;
  //   return numberToSvgLookup[this._numSurroundingMines.toString()];
  // }

  toHash() {
    return {
      displayImage: this.displayImage,
      coordinates: this.coordinates,
      losingTile: this._losingTile,
      flaggedFalse: this._flaggedFalse,
    };
  }

  reveal() {
    if (this._flagged) {
      this.unflag();
      return;
    }
    this._revealed = true;
  }

  flag() {
    if (this._revealed) return;
    if (this._flagged) {
      this.unflag();
      return;
    }
    this._flagged = true;
  }

  unflag() {
    if (this._revealed || !this._flagged) return;
    this._flagged = false;
  }

  set numSurroundingMines(value) {
    if (this._isMine) {
      new InvalidAssignmentError(
        `Cannot set numSurroundingMines for ${this._desc} - _isMine set to true`
      );
    }
    Object.defineProperty(this, '_numSurroundingMines', { value });
  }

  markAsMine() {
    if (this.hasOwnProperty('_numSurroundingMines')) {
      new InvalidAssignmentError(
        `Cannot set isMine for ${this._desc} - _numSurroundingMines already assigned`
      );
    }
    Object.defineProperty(this, '_isMine', { value: true });
  }

  markLosingTile() {
    if (this._isMine || this._revealed) {
      Object.defineProperty(this, '_losingTile', { value: true });
      return;
    }
    new InvalidAssignmentError(
      `Cannot set _losingTile for ${this._desc}, _isMine is ${this._isMine} ` +
      `and _revealed is ${this._revealed}`
    );
  }

  markAsFalseFlagged() {
    if (this._flagged && !this._isMine) {
      Object.defineProperty(this, '_flaggedFalse', { value: true });
      return;
    }
    new InvalidAssignmentError(
      `Cannot set _losingTile for ${this._desc}, _isMine is ${this._isMine} ` +
      `and _revealed is ${this._revealed}`
    );
  }
}

Tile.propTypes = {
  rowIdx: PropTypes.number,
  colIdx: PropTypes.number
};

export default Tile;
