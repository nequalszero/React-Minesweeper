import PropTypes from 'prop-types';
import GameSettings from './GameSettings';
import { BEGINNER, INTERMEDIATE, EXPERT } from './Difficulties';

const settingParameters = {
  [BEGINNER]: { numRows: 8, numCols: 8, numMines: 10 },
  [INTERMEDIATE]: { numRows: 16, numCols: 16, numMines: 40 },
  [EXPERT]: { numRows: 24, numCols: 24, numMines: 99 }
};

class InvalidDifficultyError extends TypeError {
  constructor(...args) {
    super(...args);
    Error.captureStackTrace(this, InvalidDifficultyError);
  }
};

class GameSettingsFactory {

  static build(params) {
    PropTypes.checkPropTypes(
      GameSettingsFactory.propTypes, params, 'params', 'GameSettingsFactory'
    );

    switch(params.difficulty) {
      case BEGINNER:
        return new GameSettings(settingParameters[BEGINNER]);
      case INTERMEDIATE:
        return new GameSettings(settingParameters[INTERMEDIATE]);
      case EXPERT:
        return new GameSettings(settingParameters[EXPERT]);
      default:
        new InvalidDifficultyError(`Invalid difficulty: '${params.difficulty}'`);
    }
  }
}

GameSettingsFactory.propTypes = {
  difficulty: PropTypes.oneOf([ BEGINNER, INTERMEDIATE, EXPERT ])
};

export default GameSettingsFactory;
