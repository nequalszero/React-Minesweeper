import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Tile.css';

const Tile = (props) => {
  const tileClass = classNames({
    'losing-tile': props.losingTile,
    'tile': true
  });

  return (
    <div className={tileClass} onClick={props.onTileClick}>
      <img src={props.displayImage} className="display-image" alt=""/>
    </div>
  );
}

Tile.propTypes = {
  onTileClick: PropTypes.func.isRequired,
  displayImage: PropTypes.string.isRequired,
  losingTile: PropTypes.bool,
}

export default Tile;
