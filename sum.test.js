const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 2 + 4 to equal 6', () => {
  expect(sum(2, 4)).toBe(6);
});
