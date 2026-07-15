import test from 'node:test';
import assert from 'node:assert/strict';

globalThis.localStorage = {
  getItem() {
    return null;
  },
  setItem() {},
  removeItem() {}
};

const { Game } = await import('../js/game.js');

test('uses the rotation before the final remainder of holes', () => {
  const game = new Game();
  game.setup(['A', 'B', 'C', 'D'], 0.25, 18);

  assert.equal(game.currentWolf, game.players[0].name);
});

test('uses the lowest-score player for the final remainder of holes', () => {
  const game = new Game();
  game.setup(['A', 'B', 'C', 'D'], 0.25, 18);

  game.players[0].points = 0;
  game.players[1].points = 3;
  game.players[2].points = 3;
  game.players[3].points = 3;

  game.hole = 17;
  game.setWolf();

  assert.equal(game.currentWolf, game.players[0].name);
});

test('uses the lowest-score player for the final remainder when the holes do not divide evenly', () => {
  const game = new Game();
  game.setup(['A', 'B', 'C'], 0.25, 10);

  game.players[0].points = 0;
  game.players[1].points = 2;
  game.players[2].points = 2;

  game.hole = 10;
  game.setWolf();

  assert.equal(game.currentWolf, game.players[0].name);
});
