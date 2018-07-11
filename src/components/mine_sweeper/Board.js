import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import './Board.css';

const Board = (props) => {
  const createTile = (tile, idx) => (
    <Tile onTileClick={() => props.onTileClick(tile.coordinates)}
      displayImage={tile.displayImage}
      losingTile={tile.losingTile}
      key={idx}>
    </Tile>
  );

  const createRow = (row) => (
    row.map((tile, idx) => createTile(tile, idx))
  );

  const rows = props.grid.map((row, rowIdx) => (
    <div className="row" key={rowIdx}>
      {createRow(row)}
    </div>
  ));

  return (
    <div className="board-wrapper">
      <div className="board">
        {rows}
      </div>
    </div>
  );
};

Board.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default Board;
