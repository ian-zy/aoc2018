// Generated by BUCKLESCRIPT VERSION 4.0.18, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var $$Array = require("bs-platform/lib/js/array.js");
var Caml_format = require("bs-platform/lib/js/caml_format.js");

function loadTestInputAsStringArray(inputFile) {
  return Fs.readFileSync(inputFile, "utf8").split("\n");
}

function loadTestInputAsIntArray(inputFile) {
  return $$Array.map(Caml_format.caml_int_of_string, loadTestInputAsStringArray(inputFile));
}

exports.loadTestInputAsStringArray = loadTestInputAsStringArray;
exports.loadTestInputAsIntArray = loadTestInputAsIntArray;
/* fs Not a pure module */