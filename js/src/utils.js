const fs = require("fs");

async function loadTestInputAsStringArray(filename) {
    const fileContent = await fs.promises.readFile(filename, "utf8")
    return fileContent.split("\n");
}

async function loadTestInputAsIntegerArray(filename) {
    const inputStrings = await loadTestInputAsStringArray(filename)
    return inputStrings.map(s => s.replace(/\+/, "")).map(s => parseInt(s));
}

module.exports = {
    loadTestInputAsStringArray,
    loadTestInputAsIntegerArray
}