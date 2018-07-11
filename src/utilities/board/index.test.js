import { allAdjacentCoordiatesFor } from './';

describe('adjacentCoordinatesFor', () => {
  let result;

  describe('when given no bounds uses [0, 0] as the default minimums', () => {
    test('returns the expected adjacent coordinates for [0, 0]', () => {
      result = allAdjacentCoordiatesFor({coordinates: [0, 0]});
      expect(result.length).toEqual(3);
      expect(result).toContainEqual([0, 1]);
      expect(result).toContainEqual([1, 0]);
      expect(result).toContainEqual([1, 1]);
    });

    test('returns the expected adjacent coordinates for [1, 1]', () => {
      result = allAdjacentCoordiatesFor({coordinates: [1, 1]});
      const expected = [
        [0, 0], [1, 0], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2], [0, 1]
      ];
      expected.forEach((coordinate) => {
        expect(result).toContainEqual(coordinate);
      })
      expect(result.length).toEqual(8);
    });
  });

  describe('when given lower bounds of [1, 1]', () => {
    test('returns the expected adjacent coordinates for [1, 1]', () => {
      result = allAdjacentCoordiatesFor({
        coordinates: [1, 1],
        bounds: {minRows: 1, minCols: 1}
      });
      expect(result.length).toEqual(3);
      expect(result).toContainEqual([2, 1]);
      expect(result).toContainEqual([2, 2]);
      expect(result).toContainEqual([1, 2]);
    });
  });

  describe('when given upper bounds of [1, 1]', () => {
    test('returns no adjacent coordinates for [0, 0]', () => {
      result = allAdjacentCoordiatesFor({
        coordinates: [0, 0],
        bounds: {maxRows: 1, maxCols: 1}
      });
      expect(result).toEqual([]);
    });

    test('returns the expected adjacent coordinates for [1, 1]', () => {
      result = allAdjacentCoordiatesFor({
        coordinates: [1, 1],
        bounds: {maxRows: 1, maxCols: 1}
      });
      expect(result).toEqual([[0, 0]]);
    });
  });

  describe('when given upper bounds of [2, 2]', () => {
    test('returns the expected adjacent coordinates for [0, 0]', () => {
      result = allAdjacentCoordiatesFor({
        coordinates: [0, 0],
        bounds: {maxRows: 2, maxCols: 2}
      });
      expect(result).toEqual(allAdjacentCoordiatesFor({coordinates: [0, 0]}));
    });

    test('returns the expected adjacent coordinates for [1, 1]', () => {
      result = allAdjacentCoordiatesFor({
        coordinates: [1, 1],
        bounds: {maxRows: 2, maxCols: 2}
      });
      expect(result).toContainEqual([0, 0]);
      expect(result).toContainEqual([0, 1]);
      expect(result).toContainEqual([1, 0]);
    });
  });
});
