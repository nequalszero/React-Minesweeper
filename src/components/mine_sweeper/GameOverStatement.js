import React from 'react';
import PropTypes from 'prop-types';
import './GameOverStatement.css';
import GameOverlayModal from './GameOverlayModal';
import './GameOverStatement.css';

const GameOverStatement = (props) => {
  let text;
  if (props.gameWon) text = "You won!";
  if (props.gameLost) text = "You lost!";

  return (
    <GameOverlayModal>
      <div className="game-over-statment__container">
        <p className="game-over-statement__text">{text}</p>
        <button className="game-over-statement__button"
          onClick={props.dismissOverlay}>
          Okay
        </button>
      </div>
    </GameOverlayModal>
  );
};

GameOverStatement.propTypes = {
  gameWon: PropTypes.bool,
  gameLost: PropTypes.bool,
  dismissOverlay: PropTypes.func.isRequired
};

export default GameOverStatement;
