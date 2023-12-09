const fs = require("fs");

// read contents of the file
const data = fs.readFileSync("03/data.txt", "UTF-8");
// const data = fs.readFileSync("03/data-sample.txt", "UTF-8");
const lines = data.split(/\r?\n/);
const gridWidth = lines[0].length;
const newGrid = data.replaceAll(/\d/g, ".");
const newLines = newGrid.split(/\r?\n/);
let total = 0;

// First Answer
// Get all numeric values in the file
let regex = /(\d+)/g;
// console.log(data);
let numbers = [...data.matchAll(regex)];

let regexDot = /(\.)/g;

// loop through the numbers
for (let number of numbers) {
  let row = Math.floor(number["index"] / (gridWidth + 1));
  let col = number["index"] % (gridWidth + 1);
  // console.log(`Number: ${number[1]} Row: ${row}, Col: ${col}`);

  // Check the grid around the number is composed of .
  // If so do not add the number to total
  let goodNumber = false;
  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 0 || i >= lines.length) {
      continue;
    }
    let strToCheck = newLines[i].substring(
      Math.max(0, col - 1),
      Math.min(gridWidth, col + number[1].length + 1)
    );
    let dots = [...strToCheck.matchAll(regexDot)];
    if (dots.length != strToCheck.length) {
      goodNumber = true;
    }
  }
  if (goodNumber) {
    total += parseInt(number[1]);
  }
}

console.log(`First Answer: ${total}`);
