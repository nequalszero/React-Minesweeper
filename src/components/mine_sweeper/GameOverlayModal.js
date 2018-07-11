import React from 'react';
import './GameOverlayModal.css';

const GameOverlayModal = (props) => {
  return <div className="game-overlay-modal">{props.children}</div>;
}

export default GameOverlayModal
