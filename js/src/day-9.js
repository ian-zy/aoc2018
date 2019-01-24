const { List } = require("immutable");

function createGame(numberOfPlayers, lastMarble) {
  let players = List();
  for(let i=0; i<numberOfPlayers; i++) {
    players = players.push(List());
  }
  return {
    circle: List.of(0),
    currenMarbleIndex: 0,
    nextMarble: 1,
    lastMarble,
    players,
    nextPlayer: 0
  }
}

function willPlaceSpecialMarble(game) {
  return game.nextMarble % 23 === 0;
}

function placeNextMarbleNormally(game) {
  const insertionIndex = ((game.currenMarbleIndex + 1) % game.circle.size) + 1;

  return {
    ...game,
    circle: game.circle.insert(insertionIndex, game.nextMarble),
    currenMarbleIndex: insertionIndex,
    nextMarble: game.nextMarble + 1,
    nextPlayer: (game.nextPlayer + 1) % game.players.size
  }
}

function playSpecialMove(game) {
  const removalIndex = (((game.currenMarbleIndex - 7) % game.circle.size) + game.circle.size) % game.circle.size;
  const newCircle = game.circle.delete(removalIndex);
  return {
    ...game,
    circle: newCircle,
    currenMarbleIndex: removalIndex % newCircle.size,
    players: game.players.update(game.nextPlayer, player => player.push(game.nextMarble, game.circle.get(removalIndex))),
    nextMarble: game.nextMarble + 1,
    nextPlayer: (game.nextPlayer + 1) % game.players.size
  }
}

function play(game) {
  if(willPlaceSpecialMarble(game)) {
    game = playSpecialMove(game);
  } else {
    game = placeNextMarbleNormally(game);
  }
  return game;
}

function isGameInProgress(game) {
  return game.nextMarble <= game.lastMarble;
}

function getWinningScore(game) {
  return game.players.map(p => p.reduce((a, b) => a + b, 0)).max();
}

function computeHighScore(numOfPlayers, lastMarble) {
  let game = createGame(numOfPlayers, lastMarble);
  while(isGameInProgress(game)){
    game = play(game);
  }
  return getWinningScore(game);
}

module.exports = {
  computeHighScore
}
