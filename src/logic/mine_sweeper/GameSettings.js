import PropTypes from 'prop-types';

class GameSettings {
  constructor(params) {
    PropTypes.checkPropTypes(
      GameSettings.propTypes, params, 'params', 'GameSettings'
    );
    const { numRows, numCols, numMines } = params;

    Object.defineProperty(this, '_numRows', { value: numRows });
    Object.defineProperty(this, '_numCols', { value: numCols });
    Object.defineProperty(this, '_numMines', { value: numMines });
  }

  get numRows() {
    return this._numRows;
  }

  get numCols() {
    return this._numCols;
  }

  get numMines() {
    return this._numMines;
  }
}

GameSettings.propTypes = {
  numRows: PropTypes.number,
  numCols: PropTypes.number,
  numMines: PropTypes.number
};

export default GameSettings;
