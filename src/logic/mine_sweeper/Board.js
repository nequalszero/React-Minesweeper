import PropTypes from 'prop-types';
import Tile from './Tile';
import GameSettings from './GameSettings';
import { filter, shuffle } from 'lodash';
import { allAdjacentCoordiatesFor  } from '../../utilities/board';

class Board {
  constructor(params) {
    PropTypes.checkPropTypes(Board.propTypes, params, 'params', 'Board');
    this._gameSettings = params.gameSettings;
  }

  setup() {
    this._grid = [];
    this._numTilesRevealed = 0;
    this._createTiles();
    this._assignMines();
    this._assignNumbers();
    this._numTiles = this._grid[0].length * this._grid.length;
  }

  get grid() {
    return this._grid;
  }

  get rawGrid() {
    return this._grid.map((row) => row.map((tile) => tile.toHash()));
  }

  get unrevealedTileCount() {
    return this._numTiles - this._numTilesRevealed;
  }

  // Minesweeper Cascade Algorithm http://www.techuser.net/minecascade.html
  // 1. Initialize a queue
  // 2. If current square is non-mine uncover it and add to queue, otherwise
  //    game over
  // 3. Remove a square from queue
  // 4. Count mines adjacent to it
  // 5. If adjacent mine count is zero, add any adjacent covered squares to queue
  //    and uncover them
  // 6. Go to step 3 if queue is not empty, otherwise finish
  reveal(coordinates) {
    const tile = this._getTile(coordinates);
    // Return true if tile is already uncovered.
    if (tile.revealed) return true;

    tile.reveal();

    // If unflagging a flagged tile
    if (!tile.revealed) {
      return true
    };
    // Return false if revealed tile is a mine
    if (tile.isMine) return this._triggerGameLoss(tile);

    // If tile has been revealed and is not a mine
    this._numTilesRevealed += 1;

    this._maybeRevealAdditionalTiles(tile);
    return true;
  }

  flag(coordinates) {
    const tile = this._getTile(coordinates);
    tile.flag();
  }

  isMine(coordinates) {
    return this._getTile(coordinates).isMine;
  }

  isFlagged(coordinates) {
    return this._getTile(coordinates).flagged;
  }

  _triggerGameLoss(losingTile) {
    losingTile.markLosingTile();

    // Identify incorrectly flagged mines
    this._tiles.forEach((tile) => {
      if (tile.flagged && !tile.isMine) tile.markAsFalseFlagged();
    });

    // Reveal unflagged mines
    this._mineTiles.forEach((mineTile) => {
      if (!mineTile.flagged && !mineTile.revealed) mineTile.reveal();
    });

    return false;
  }

  _maybeRevealAdditionalTiles(tile) {
    if (tile.numSurroundingMines > 0) return;

    const adjacentTiles = this._adjacentTilesFor(...tile.coordinates);
    const adjacentCoveredTiles = filter(adjacentTiles, (tile) => !tile.revealed);
    adjacentCoveredTiles.forEach((tile) => { tile.reveal(); });
    adjacentCoveredTiles.forEach((tile) => { this._maybeRevealAdditionalTiles(tile) });
  }

  _getTile(coordinates) {
    return this._grid[coordinates[0]][coordinates[1]];
  }

  _createTiles() {
    let row, tile;
    // Array for storing all tiles to avoid future nested looping over the grid
    this._tiles = [];

    for (let rowIdx = 0; rowIdx < this._gameSettings.numRows; rowIdx++) {
      row = [];
      for (let colIdx = 0; colIdx < this._gameSettings.numCols; colIdx++) {
        tile = new Tile({rowIdx, colIdx});
        this._tiles.push(tile);
        row.push(tile);
      }
      this._grid.push(row);
    }
  }

  _assignMines() {
    this._mineTiles = [];
    const mineCoordinates = this._generateMineCoordinates();
    this._mineTiles = mineCoordinates.map((coordinates) => (
      this._getTile(coordinates)
    ));

    this._mineTiles.forEach((tile) => { tile.markAsMine(); });
  }

  _assignNumbers() {
    let adjacentTiles;

    this._tiles.forEach((tile) => {
      if (tile.isMine) return;

      adjacentTiles = this._adjacentTilesFor(...tile.coordinates);

      tile.numSurroundingMines = filter(adjacentTiles, (adjTile) => (
        adjTile.isMine
      )).length;
    });
  }

  _generateMineCoordinates() {
    const allCoordinates = [];

    for (let rowIdx = 0; rowIdx < this._gameSettings.numRows; rowIdx++) {
      for (let colIdx = 0; colIdx < this._gameSettings.numCols; colIdx++) {
        allCoordinates.push([rowIdx, colIdx]);
      }
    }

    return shuffle(allCoordinates).slice(0, this._gameSettings.numMines);
  }

  _adjacentTilesFor(rowIdx, colIdx) {
    return allAdjacentCoordiatesFor({
      coordinates: [rowIdx, colIdx],
      bounds: {
        maxRows: this._gameSettings.numRows,
        maxCols: this._gameSettings.numCols
      }
    }).map((coordinates) => (this._grid[coordinates[0]][coordinates[1]]))
  }
}

Board.propTypes = {
  gameSettings: PropTypes.instanceOf(GameSettings)
};

export default Board;
