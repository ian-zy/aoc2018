declare module "utils" {
  function loadTestInputAsStringArray(filename: string): Promise<string[]>
  function loadTestInputAsIntegerArray(filename: string): Promise<number[]>
}
