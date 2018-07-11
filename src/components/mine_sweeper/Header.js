import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = (props) => {
  return (
    <div className="header">
      <div className="header__center-buttons-container">
        <div className="header__mine-count">
          {props.apparentMinesRemaining}
        </div>
        <button className="header__button header__button-new-game"
          onClick={props.promptNewGame}>
          New Game
        </button>
        <button onClick={props.toggleClickType}
          className="header__button-img-container header__button">
          <img src={props.clickTypeImg} alt="toggle click type"
            className="header__button-img"/>
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  promptNewGame: PropTypes.func.isRequired,
  clickTypeImg: PropTypes.string.isRequired,
  toggleClickType: PropTypes.func.isRequired,
  apparentMinesRemaining: PropTypes.number
};

export default Header;
