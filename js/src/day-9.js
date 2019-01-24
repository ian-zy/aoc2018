class Circle {
  constructor() {
    this.currentNode = {value: 0};
    this.currentNode.prev = this.currentNode;
    this.currentNode.next = this.currentNode;
    this.size = 1;
  }

  getNodeClockwise(distance) {
    let node = this.currentNode;
    for(let i=0; i<distance; i++) {
      node = node.next;
    }
    return node;
  }

  getNodeCounterClockwise(distance) {
    let node = this.currentNode;
    for(let i=0; i<distance; i++) {
      node = node.prev;
    }
    return node;
  }  

  insertClockwise(distance, value) {
    const node = this.getNodeClockwise(distance);
    const newNode = {
      value,
      prev: node,
      next: node.next
    };
    node.next = newNode;
    newNode.next.prev = newNode;
    this.currentNode = newNode;
  }

  removeCounterClockwise(distance) {
    const node = this.getNodeCounterClockwise(distance);
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.currentNode = node.next;
    return node.value;
  }
}

function createGame(numberOfPlayers, lastMarble) {
  let players = [];
  for(let i=0; i<numberOfPlayers; i++) {
    players.push(0);
  }
  return {
    circle: new Circle(),
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
  game.circle.insertClockwise(1, game.nextMarble);
  game.nextMarble += 1;
  game.nextPlayer = (game.nextPlayer + 1) % game.players.length;
}

function playSpecialMove(game) {
  game.players[game.nextPlayer] += (game.nextMarble + game.circle.removeCounterClockwise(7));
  game.nextMarble += 1;
  game.nextPlayer = (game.nextPlayer + 1) % game.players.length;
}

function play(game) {
  if(willPlaceSpecialMarble(game)) {
    playSpecialMove(game);
  } else {
    placeNextMarbleNormally(game);
  }
}

function isGameInProgress(game) {
  return game.nextMarble <= game.lastMarble;
}

function getWinningScore(game) {
  return Math.max(...game.players);
}

function computeHighScore(numOfPlayers, lastMarble) {
  let game = createGame(numOfPlayers, lastMarble);
  while(isGameInProgress(game)){
    play(game);
  }
  return getWinningScore(game);
}

module.exports = {
  computeHighScore
}
