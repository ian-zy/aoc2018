let loadTestInputAsStringArray = (inputFile) =>
  Node.Fs.readFileSync(inputFile, `utf8) |> Js.String.split("\n");

let loadTestInputAsIntArray = (inputFile) =>
  loadTestInputAsStringArray(inputFile) |> Array.map(int_of_string);
  