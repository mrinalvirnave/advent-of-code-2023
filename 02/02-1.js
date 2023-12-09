const fs = require("fs");

// read contents of the file
const data = fs.readFileSync("02/data.txt", "UTF-8");
// const data = fs.readFileSync("02/data-sample.txt", "UTF-8");
const lines = data.split(/\r?\n/);

const maxCubes = { red: 12, green: 13, blue: 14 };

// First Answer
// Loop through the lines
let total = 0;
let gameRE = /Game (\d+): (.*)/;
let colorRE = /(\d+) (\w+)/g;
for (let line of lines) {
  let gameline = line.match(gameRE);
  let game = gameline[1];
  let colorlist = gameline[2];
  let colors = [...colorlist.matchAll(colorRE)];
  let goodGame = true;
  // loop through the colors
  for (let color of colors) {
    let count = parseInt(color[1]);
    let cube = color[2];
    if (count > maxCubes[cube]) {
      console.log(`Game ${game} has too many ${cube} cubes`);
      goodGame = false;
    }
  }
  if (goodGame) {
    total += parseInt(game);
  }
}
console.log(`First Answer: ${total}`);
