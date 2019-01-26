class Cache {
  constructor() {
    this._cache = [];
  }

  get(x, y, size) {
    return this._cache[x] === undefined
      ? undefined
      : this._cache[x][y] === undefined
      ? undefined
      : this._cache[x][y][size];
  }

  set(x, y, size, value) {
    if (this._cache[x] === undefined) {
      this._cache[x] = [];
    }
    if (this._cache[x][y] === undefined) {
      this._cache[x][y] = [];
    }
    this._cache[x][y][size] = value;
  }
}

class PowerGrid {
  constructor(serialNumber, width, height) {
    this.serialNumber = serialNumber;
    this.width = width;
    this.height = height;
    this.powerLevels = [];
    this.squarePowerCache = new Cache();
    this._buildPowerGrid();
  }

  _computeCellPowerLevel(x, y) {
    const rackId = x + 10;
    let powerLevel = rackId * y;
    powerLevel += this.serialNumber;
    powerLevel *= rackId;
    powerLevel = Math.trunc((powerLevel / 100) % 10);
    powerLevel -= 5;
    return powerLevel;
  }

  _buildPowerGrid() {
    for (let r = 0; r < this.height; r++) {
      this.powerLevels[r] = [];
      for (let c = 0; c < this.width; c++) {
        this.powerLevels[r][c] = this._computeCellPowerLevel(c + 1, r + 1);
      }
    }
  }

  getCellPowerLevel(x, y) {
    return this.powerLevels[y - 1][x - 1];
  }

  getTotalPowerOfColumn(x, y, size) {
    let power = 0;
    for (let i = y; i < y + size; i++) {
      power += this.getCellPowerLevel(x, i);
    }
    return power;
  }

  getTotalPowerOfRow(x, y, size) {
    let power = 0;
    for (let i = x; i < x + size; i++) {
      power += this.getCellPowerLevel(i, y);
    }
    return power;
  }

  getTotalPowerOfSquare(x, y, size) {
    const cachedPower = this.squarePowerCache.get(x, y, size);
    if (cachedPower !== undefined) return cachedPower;

    if (size === 1) return this.getCellPowerLevel(x, y);

    const power =
      this.getTotalPowerOfSquare(x, y, size - 1) +
      this.getTotalPowerOfColumn(x + size - 1, y, size - 1) +
      this.getTotalPowerOfRow(x, y + size - 1, size - 1) +
      this.getCellPowerLevel(x + size - 1, y + size - 1);
    this.squarePowerCache.set(x, y, size, power);
    return power;
  }

  findMostPowerfulSquareWithSize(size) {
    let cellWithLargestTotalPower = {
      power: -Infinity,
      coordinate: []
    };

    for (let r = 1; r <= this.height - size + 1; r++) {
      for (let c = 1; c <= this.width - size + 1; c++) {
        const totalPower = this.getTotalPowerOfSquare(c, r, size);
        if (totalPower > cellWithLargestTotalPower.power) {
          cellWithLargestTotalPower.power = totalPower;
          cellWithLargestTotalPower.coordinate = [c, r];
        }
      }
    }

    return cellWithLargestTotalPower;
  }

  findMostPowerfulSquare() {
    let largest = {
      power: -Infinity,
      coordinate: [],
      size: 0
    };

    for (let size = 1; size <= 300; size++) {
      let result = this.findMostPowerfulSquareWithSize(size);
      if (result.power > largest.power) {
        largest.power = result.power;
        largest.coordinate = result.coordinate;
        largest.size = size;
      }
    }

    return largest;
  }
}

module.exports = {
  PowerGrid
};
