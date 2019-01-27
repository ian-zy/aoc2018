open Jest;
open Expect;
open Day12;

test("createPatternMap", () =>
  expect(createPatternMap([|"...## => #"|]))
  |> toEqual(Belt.Map.String.fromArray([|("...##", "#")|]))
);

test("createGeneration", () =>
  expect(createGeneration("#..#.##.#"))
  |> toEqual({state: "#..#.##.#", startIndex: 0})
);

test("sumOfPotNumbers", () =>
  expect(sumOfPotNumbers(createGeneration("#..#.##.#"))) |> toEqual(22)
);

describe("getPattern", () => {
  test("works at beginning", () =>
    expect(getPattern("#..#.##.#", 0)) |> toEqual("..#..")
  );
  test("works at end", () =>
    expect(getPattern("#..#.##.#", 8)) |> toEqual("#.#..")
  );
  test("works in the middle", () =>
    expect(getPattern("#..#.##.#", 5)) |> toEqual("#.##.")
  );
  test("works with negtive index", () =>
    expect(getPattern("#..#.##.#", -1)) |> toEqual("...#.")
  );
  test("works down to -3", () =>
    expect(getPattern("#..#.##.#", -3)) |> toEqual(".....")
  );
  test("works with index larger than length", () =>
    expect(getPattern("#..#.##.#", 9)) |> toEqual(".#...")
  );
  test("works up to length + 2", () =>
    expect(getPattern("#..#.##.#", 11)) |> toEqual(".....")
  );
});

test("evolve", () => {
  let patternMap =
    createPatternMap([|
      "...## => #",
      "..#.. => #",
      ".#... => #",
      ".#.#. => #",
      ".#.## => #",
      ".##.. => #",
      ".#### => #",
      "#.#.# => #",
      "#.### => #",
      "##.#. => #",
      "##.## => #",
      "###.. => #",
      "###.# => #",
    |]);
  let generation = createGeneration("#..#.#..##......###...###");
  expect(evolve(~patternMap, ~generation))
  |> toEqual({state: "#...#....#.....#..#..#..#", startIndex: 0});
});

test("simulate", () => {
  let patternInputs = [|
    "...## => #",
    "..#.. => #",
    ".#... => #",
    ".#.#. => #",
    ".#.## => #",
    ".##.. => #",
    ".#### => #",
    "#.#.# => #",
    "#.### => #",
    "##.#. => #",
    "##.## => #",
    "###.. => #",
    "###.# => #",
    "####. => #",
  |];
  let initialState = "#..#.#..##......###...###";
  expect(simulate(initialState, patternInputs, 20))
  |> toEqual({
       state: "#....##....#####...#######....#.#..##",
       startIndex: (-2),
     });
});

type bignumber;
[@bs.new] [@bs.module] external bigNumber : string => bignumber = "bignumber.js";
[@bs.send] external plus : bignumber => int => bignumber = "plus";
[@bs.send] external minus : bignumber => int => bignumber = "minus";
[@bs.send] external times : bignumber => int => bignumber = "times";
[@bs.send] external to_string : bignumber => string = "toString";

describe("simulate task input", () => {
  let inputs =
    TestUtils.loadTestInputAsStringArray("../tasks/day12/input.txt");
  let initialState = Js.String.replace("initial state: ", "", inputs[0]);
  let patternInputs = Js.Array.sliceFrom(2, inputs);

  test("for 20 generation", () => {
    let endGeneration = simulate(initialState, patternInputs, 20);
    expect(sumOfPotNumbers(endGeneration)) |> toEqual(2063);
  });

  test("for 50 billion generation", () => {
    /* the delta increase in the sum become constant 32 from 97 generation */
    let endGeneration = simulate(initialState, patternInputs, 97);
    let baseSum = sumOfPotNumbers(endGeneration);
    expect(bigNumber("50000000000")->minus(97)->times(32)->plus(baseSum)->to_string) |> toEqual("1600000000328");
  });
});
