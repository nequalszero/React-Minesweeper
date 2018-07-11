import React from 'react';
import {
  Header, DifficultySelector, Board, GameOverStatement
} from './mine_sweeper';
import { Game } from '../logic/mine_sweeper';
import './MineSweeper.css';
import flagLogo from '../images/mine_sweeper/flag.svg';
import mineLogo from '../images/mine_sweeper/mine.svg';

const REVEAL = 'reveal';
const FLAG = 'flag';
const toggleClickTypeImg = {
  [REVEAL]: mineLogo,
  [FLAG]: flagLogo
};

class MineSweeper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameInProgress: false,
      modalStates: {
        selectDifficulty: false,
        endCurrentGame: false,
        gameWon: false,
        gameLost: false
      },
      clickType: REVEAL
    };

    this.promptNewGame = this.promptNewGame.bind(this);
    this.onDifficultySelect = this.onDifficultySelect.bind(this);
    this.toggleClickType = this.toggleClickType.bind(this);
    this.onTileClick = this.onTileClick.bind(this);
    this.dismissGameOverStatement = this.dismissGameOverStatement.bind(this);
  };

  promptNewGame = () => {
    const newModalState = { ...this.state.modalStates };

    // if (this.state.gameInProgress) {
    //   newModalState.endCurrentGame = true;
    // } else {
    //   newModalState.selectDifficulty = true;
    // }
    newModalState.selectDifficulty = !newModalState.selectDifficulty;

    this.setState({ modalStates: newModalState });
  }

  onDifficultySelect = (difficulty) => {
    this.game = new Game(difficulty);
    this.setState({
      grid: this.rawGrid(),
      apparentMinesRemaining: this.game.apparentMinesRemaining,
      gameInProgress: true,
      modalStates: {
        ...this.state.modalStates,
        selectDifficulty: false,
        gameWon: false,
        gameLost: false
      }
    });
  }

  toggleClickType = () => {
    const clickType = this.state.clickType === REVEAL ? FLAG : REVEAL;
    this.setState({ clickType });
  }

  onTileClick = (coordinates) => {
    if (!this.game.inProgress) return;

    if (this.state.clickType === REVEAL) {
      this.game.reveal(coordinates);
    } else {
      this.game.flag(coordinates);
    }

    this.setState({
      grid: this.rawGrid(),
      apparentMinesRemaining: this.game.apparentMinesRemaining,
      modalStates: {
        ...this.state.modalStates,
        gameWon: this.game.gameWon,
        gameLost: this.game.gameLost
      }
    });
  }

  rawGrid() {
    return this.game.rawGrid;
  }

  dismissGameOverStatement = () => {
    if (this.state.modalStates.gameWon) {
      this.setState({
        modalStates: { ...this.state.modalStates, gameWon: false }
      });
    } else if (this.state.modalStates.gameLost) {
      this.setState({
        modalStates: { ...this.state.modalStates, gameLost: false }
      });
    }
  }

  render() {
    return (
      <div>
        <Header promptNewGame={this.promptNewGame}
          toggleClickType={this.toggleClickType}
          clickTypeImg={toggleClickTypeImg[this.state.clickType]}
          apparentMinesRemaining={this.state.apparentMinesRemaining}>
        </Header>
        <div className="game-wrapper">
          { this.state.modalStates.selectDifficulty &&
            <DifficultySelector difficulties={Game.difficulties}
              onDifficultySelect={this.onDifficultySelect} />
          }
          { (this.state.modalStates.gameWon || this.state.modalStates.gameLost) &&
            <GameOverStatement gameWon={this.state.modalStates.gameWon}
              gameLost={this.state.modalStates.gameLost}
              dismissOverlay={this.dismissGameOverStatement}/>
          }
          { this.state.grid &&
            <Board grid={this.state.grid}
              onTileClick={this.onTileClick}>
            </Board>
          }
        </div>
      </div>
    );
  }
}

export default MineSweeper;
