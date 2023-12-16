const fs = require("fs");

// read contents of the file
const data = fs.readFileSync(`${__dirname}/data.txt`, "UTF-8");
// const data = fs.readFileSync(`${__dirname}/data-sample.txt`, "UTF-8");
const lines = data.split(/\r?\n/);

function processScratchOffCard(winningLine, scratchedLine) {
  const winningNumbers = winningLine.match(/\d+/g);
  const scratchedNumbers = scratchedLine.match(/\d+/g);
  const wins = scratchedNumbers.filter((value) =>
    winningNumbers.includes(value)
  );
  // console.log(wins);
  return wins.length;
}

let cards = Array(lines.length).fill(1);
let wins = [];
processCardPile = (currentCard, currentMatches) => {
  cards.forEach((card) => {
    total += card;
  });
  return total;
};

// Loop through the lines and process them
lines.forEach((line) => {
  const regex = /^Card\s+(\d+): (.*) \| (.*)$/;
  const matches = line.match(regex);
  const card = matches[1];
  const winningLine = matches[2].trim();
  const scratchedLine = matches[3].trim();
  wins.push(processScratchOffCard(winningLine, scratchedLine));
});

total = wins.map((numMatches, index) => {
  for (let i = index; i < index + numMatches; i++) {
    cards[i + 1] += cards[index];
  }
});

const sum = cards.reduce((partialSum, a) => partialSum + a, 0);
console.log("Second Answer: ", sum);
