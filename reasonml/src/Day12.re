let createPatternMap = inputs => {
  let inputPattern = [%bs.re "/([\.#]{5}) => ([\.#])/"];
  let matchInput = Js.String.match(inputPattern);
  let matchedToTuple = matched =>
    switch (matched) {
    | Some([|_, p, v|]) => Some((p, v))
    | _ => None
    };
  inputs
  ->Belt.Array.map(matchInput)
  ->Belt.Array.map(matchedToTuple)
  ->Belt.Array.keep(Belt.Option.isSome)
  ->Belt.Array.map(Belt.Option.getExn)
  ->Belt.Map.String.fromArray;
};

type generation = {
  state: string,
  startIndex: int,
};

let createGeneration = initialState => {state: initialState, startIndex: 0};

let sumOfPotNumbers = ({state, startIndex}) =>
  Js.String.split("", state)
  ->Belt.Array.mapWithIndex((index, char) =>
      char == "#" ? index + startIndex : 0
    )
  ->Belt.Array.reduce(0, (sum, n) => sum + n);

let getPattern = (state, index) => {
  let paddedState = "....." ++ state ++ ".....";
  if (index >= (-3) && index <= Js.String.length(state) + 2) {
    String.sub(paddedState, index + 3, 5);
  } else {
    "";
  };
};

let evolve = (~patternMap, ~generation as {state, startIndex}) => {
  let newGeneration =
    Belt.Array.range(-3, String.length(state) + 2)
    ->Belt.Array.map(getPattern(state))
    ->Belt.Array.map(__x =>
        Belt.Map.String.getWithDefault(patternMap, __x, ".")
      )
    ->Js.Array.joinWith("", _);
  let nonEmptyHeadPos = Js.String.indexOf("#", newGeneration);
  let nonEmptyTailPos = Js.String.lastIndexOf("#", newGeneration);
  {
    state:
      Js.String.substring(
        ~from=nonEmptyHeadPos,
        ~to_=nonEmptyTailPos + 1,
        newGeneration,
      ),
    startIndex: startIndex - 3 + nonEmptyHeadPos,
  };
};

let simulate = (initialState, patternInputs, totalGeneration) => {
  let generation = ref(createGeneration(initialState));
  let patternMap = createPatternMap(patternInputs);

  for (_gen in 1 to totalGeneration) {
    let newGeneration = evolve(~patternMap, ~generation=generation^);
    /* let oldSum = sumOfPotNumbers(generation^); */
    /* let newSum = sumOfPotNumbers(newGeneration); */
    /* let delta = newSum - oldSum; */
    /* Js.log({j|Generation: $gen\tSum: $newSum\tDelta: $delta|j}); */
    generation := newGeneration;
  };

  generation^;
};
