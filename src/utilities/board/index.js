import { filter } from 'lodash';

const DIRECTIONS = {};
DIRECTIONS.STRAIGHTS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
DIRECTIONS.DIAGONALS = [[1, 1], [1, -1], [-1, -1], [-1, 1]];
DIRECTIONS.ALL = [].concat(DIRECTIONS.STRAIGHTS).concat(DIRECTIONS.DIAGONALS);

const DEFAULT_BOUNDS = {
  minRows: 0, minCols: 0, maxRows: Infinity, maxCols: Infinity
};

export const allAdjacentCoordiatesFor = ({coordinates, bounds = {}}) => {
  const [rowIdx, colIdx] = coordinates;
  bounds = Object.assign({}, DEFAULT_BOUNDS, bounds);

  const adjacentCoordinates = DIRECTIONS.ALL.map((direction) => (
    [rowIdx + direction[0], colIdx + direction[1]]
  ));

  return filter(adjacentCoordinates, (coordinate) => (
    inBounds(coordinate, bounds)
  ));
};

const inBounds = (coordinate, bounds = {}) => {
  const [rowIdx, colIdx] = coordinate;

  return (
    rowIdx < bounds.maxRows &&
    colIdx < bounds.maxCols &&
    rowIdx >= bounds.minRows &&
    colIdx >= bounds.minCols
  );
};
