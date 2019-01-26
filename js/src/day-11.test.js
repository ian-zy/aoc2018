const { PowerGrid } = require("./day-11");

describe("PowerGrid", () => {
  test("cell power level", () => {
    expect(new PowerGrid(8, 300, 300).getCellPowerLevel(3, 5)).toBe(4);
    expect(new PowerGrid(57, 300, 300).getCellPowerLevel(122, 79)).toBe(-5);
    expect(new PowerGrid(39, 300, 300).getCellPowerLevel(217, 196)).toBe(0);
    expect(new PowerGrid(71, 300, 300).getCellPowerLevel(101, 153)).toBe(4);
  });

  test("total power of square", () => {
    const powerGrid = new PowerGrid(8, 300, 300);
    expect(powerGrid.getTotalPowerOfColumn(2, 1, 1)).toBe(
      powerGrid.getCellPowerLevel(2, 1)
    );
    expect(powerGrid.getTotalPowerOfRow(1, 2, 1)).toBe(
      powerGrid.getCellPowerLevel(1, 2)
    );
    expect(powerGrid.getTotalPowerOfSquare(1, 1, 1)).toBe(
      powerGrid.getCellPowerLevel(1, 1)
    );
    expect(powerGrid.getTotalPowerOfSquare(1, 1, 2)).toBe(
      powerGrid.getCellPowerLevel(1, 1) +
        powerGrid.getCellPowerLevel(2, 1) +
        powerGrid.getCellPowerLevel(1, 2) +
        powerGrid.getCellPowerLevel(2, 2)
    );
  });

  test("most powerful square with fixed size", () => {
    expect(
      new PowerGrid(18, 300, 300).findMostPowerfulSquareWithSize(3)
    ).toEqual({ coordinate: [33, 45], power: 29 });
  });

  test("most powerful square with fixed size", () => {
    expect(
      new PowerGrid(42, 300, 300).findMostPowerfulSquareWithSize(3)
    ).toEqual({ coordinate: [21, 61], power: 30 });
  });

  test("most powerful square with fixed size", () => {
    expect(
      new PowerGrid(6548, 300, 300).findMostPowerfulSquareWithSize(3)
    ).toEqual({ coordinate: [21, 53], power: 29 });
  });

  test("most powerful square with any size", () => {
    expect(new PowerGrid(18, 300, 300).findMostPowerfulSquare()).toEqual({
      coordinate: [90, 269],
      power: 113,
      size: 16
    });
  });

  test("most powerful square with any size", () => {
    expect(new PowerGrid(42, 300, 300).findMostPowerfulSquare()).toEqual({
      coordinate: [232, 251],
      power: 119,
      size: 12
    });
  });

  test("most powerful square with any size", () => {
    expect(new PowerGrid(6548, 300, 300).findMostPowerfulSquare()).toEqual({
      coordinate: [233, 250],
      power: 121,
      size: 12
    });
  });
});
