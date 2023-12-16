const fs = require("fs");

// read contents of the file
const data = fs.readFileSync(`${__dirname}/data.txt`, "UTF-8");
// const data = fs.readFileSync(`${__dirname}/data-sample.txt`, "UTF-8");
const lines = data.split(/\r?\n/);

function points(matches) {
  return Math.floor(Math.pow(2, matches - 1));
}

function processScratchOffCard(winningLine, scratchedLine) {
  const winningNumbers = winningLine.match(/\d+/g);
  const scratchedNumbers = scratchedLine.match(/\d+/g);
  const wins = scratchedNumbers.filter((value) =>
    winningNumbers.includes(value)
  );
  console.log(wins);
  return points(wins.length);
}

let total = 0;
// Loop through the lines and process them
lines.forEach((line) => {
  const regex = /^Card\s+(\d+): (.*) \| (.*)$/;
  const matches = line.match(regex);
  const cardNumber = matches[1];
  const winningLine = matches[2].trim();
  const scratchedLine = matches[3].trim();
  total += processScratchOffCard(winningLine, scratchedLine);
});

console.log("First Answer: ", total);
