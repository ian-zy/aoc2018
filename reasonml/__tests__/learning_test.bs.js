// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var TestUtils$Reasonml = require("../src/TestUtils.bs.js");

Jest.test("loadTestInputAsStringArray", (function (param) {
        return Jest.Expect[/* toEqual */12](/* array */["478 players; last marble is worth 71240 points"], Jest.Expect[/* expect */0](TestUtils$Reasonml.loadTestInputAsStringArray("../tasks/day9/input.txt")));
      }));

Jest.test("loadTestInputAsIntArray", (function (param) {
        return Jest.Expect[/* toEqual */12](-7, Jest.Expect[/* expect */0](Caml_array.caml_array_get(TestUtils$Reasonml.loadTestInputAsIntArray("../tasks/day1/input.txt"), 0)));
      }));

/*  Not a pure module */