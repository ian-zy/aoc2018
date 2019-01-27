// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var BignumberJs = require("bignumber.js");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var Day12$Reasonml = require("../src/Day12.bs.js");
var TestUtils$Reasonml = require("../src/TestUtils.bs.js");

Jest.test("createPatternMap", (function (param) {
        return Jest.Expect[/* toEqual */12](Belt_MapString.fromArray(/* array */[/* tuple */[
                          "...##",
                          "#"
                        ]]), Jest.Expect[/* expect */0](Day12$Reasonml.createPatternMap(/* array */["...## => #"])));
      }));

Jest.test("createGeneration", (function (param) {
        return Jest.Expect[/* toEqual */12](/* record */[
                    /* state */"#..#.##.#",
                    /* startIndex */0
                  ], Jest.Expect[/* expect */0](Day12$Reasonml.createGeneration("#..#.##.#")));
      }));

Jest.test("sumOfPotNumbers", (function (param) {
        return Jest.Expect[/* toEqual */12](22, Jest.Expect[/* expect */0](Day12$Reasonml.sumOfPotNumbers(Day12$Reasonml.createGeneration("#..#.##.#"))));
      }));

describe("getPattern", (function () {
        Jest.test("works at beginning", (function (param) {
                return Jest.Expect[/* toEqual */12]("..#..", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", 0)));
              }));
        Jest.test("works at end", (function (param) {
                return Jest.Expect[/* toEqual */12]("#.#..", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", 8)));
              }));
        Jest.test("works in the middle", (function (param) {
                return Jest.Expect[/* toEqual */12]("#.##.", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", 5)));
              }));
        Jest.test("works with negtive index", (function (param) {
                return Jest.Expect[/* toEqual */12]("...#.", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", -1)));
              }));
        Jest.test("works down to -3", (function (param) {
                return Jest.Expect[/* toEqual */12](".....", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", -3)));
              }));
        Jest.test("works with index larger than length", (function (param) {
                return Jest.Expect[/* toEqual */12](".#...", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", 9)));
              }));
        return Jest.test("works up to length + 2", (function (param) {
                      return Jest.Expect[/* toEqual */12](".....", Jest.Expect[/* expect */0](Day12$Reasonml.getPattern("#..#.##.#", 11)));
                    }));
      }));

Jest.test("evolve", (function (param) {
        var patternMap = Day12$Reasonml.createPatternMap(/* array */[
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
              "###.# => #"
            ]);
        var generation = Day12$Reasonml.createGeneration("#..#.#..##......###...###");
        return Jest.Expect[/* toEqual */12](/* record */[
                    /* state */"#...#....#.....#..#..#..#",
                    /* startIndex */0
                  ], Jest.Expect[/* expect */0](Day12$Reasonml.evolve(patternMap, generation)));
      }));

Jest.test("simulate", (function (param) {
        var patternInputs = /* array */[
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
          "####. => #"
        ];
        return Jest.Expect[/* toEqual */12](/* record */[
                    /* state */"#....##....#####...#######....#.#..##",
                    /* startIndex */-2
                  ], Jest.Expect[/* expect */0](Day12$Reasonml.simulate("#..#.#..##......###...###", patternInputs, 20)));
      }));

describe("simulate task input", (function () {
        var inputs = TestUtils$Reasonml.loadTestInputAsStringArray("../tasks/day12/input.txt");
        var initialState = Caml_array.caml_array_get(inputs, 0).replace("initial state: ", "");
        var patternInputs = inputs.slice(2);
        Jest.test("for 20 generation", (function (param) {
                var endGeneration = Day12$Reasonml.simulate(initialState, patternInputs, 20);
                return Jest.Expect[/* toEqual */12](2063, Jest.Expect[/* expect */0](Day12$Reasonml.sumOfPotNumbers(endGeneration)));
              }));
        return Jest.test("for 50 billion generation", (function (param) {
                      var endGeneration = Day12$Reasonml.simulate(initialState, patternInputs, 97);
                      var baseSum = Day12$Reasonml.sumOfPotNumbers(endGeneration);
                      return Jest.Expect[/* toEqual */12]("1600000000328", Jest.Expect[/* expect */0](new BignumberJs("50000000000").minus(97).times(32).plus(baseSum).toString()));
                    }));
      }));

/*  Not a pure module */
