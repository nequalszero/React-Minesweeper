import React from 'react';
import PropTypes from 'prop-types';
import './DifficultySelector.css';
import GameOverlayModal from './GameOverlayModal';

const DifficultySelector = (props) => {
  const buttons = props.difficulties.map((difficulty) => (
    <button onClick={() => props.onDifficultySelect(difficulty)}
      className="difficulty-selector__button"
      key={difficulty}>
      {difficulty}
    </button>
  ));

  return (
    <GameOverlayModal>
      <div className="difficulty-selector__button-container">
        {buttons}
      </div>
    </GameOverlayModal>
  );
}

DifficultySelector.propTypes = {
  onDifficultySelect: PropTypes.func.isRequired,
  difficulties: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DifficultySelector;
