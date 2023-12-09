const fs = require("fs");

// read contents of the file
const data = fs.readFileSync(`${__dirname}/data.txt`, "UTF-8");
// const data = fs.readFileSync(`${__dirname}/data-sample.txt`, "UTF-8");
const lines = data.split(/\r?\n/);
const gridWidth = lines[0].length;
let total = 0;

let astRE = /(\*)/g;
let numRE = /(\d+)/g;

// Second Answer
// Get all asterisks in the file
let asterisks = [...data.matchAll(astRE)];

// Function to calculate if two rectangles overlap
function calculateOverlap(rect1, rect2) {
  // Calculate the overlapping area
  let xOverlap = Math.max(
    0,
    Math.min(rect1.x + rect1.width, rect2.x + rect2.width) -
      Math.max(rect1.x, rect2.x)
  );
  let yOverlap = Math.max(
    0,
    Math.min(rect1.y + rect1.height, rect2.y + rect2.height) -
      Math.max(rect1.y, rect2.y)
  );
  let overlapArea = xOverlap * yOverlap;
  return overlapArea > 0;
}

function rectangleAroundAsterisk(x, y) {
  return { x: x - 1, y: y - 1, width: 3, height: 3 };
}

function rectangleAroundNumber(x, y, theNumber) {
  return { x: x, y: y, width: theNumber.length, height: 1 };
}

// loop through the asterisks
for (let ast of asterisks) {
  let row = Math.floor(ast["index"] / (gridWidth + 1));
  let col = ast["index"] % (gridWidth + 1);
  console.log(`Asterisk: Row: ${row}, Col: ${col}`);

  let numTouching = 0;
  let gearRatio = 1;
  let rect1 = rectangleAroundAsterisk(col, row);
  // Pick the line above, on and below the row of the asterisk
  // Check if there are any numbers in the line
  // If so, check if the number is touching the asterisk
  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 0 || i >= lines.length) {
      continue;
    }

    let numbers = [...lines[i].matchAll(numRE)];
    for (let number of numbers) {
      let rect2 = rectangleAroundNumber(number["index"], i, number[1]);
      if (calculateOverlap(rect1, rect2)) {
        numTouching++;
        gearRatio *= parseInt(number[1]);
      }
    }
  }

  if (numTouching > 1) {
    console.log(`Asterisk: ${ast[1]} Gear Ratio: ${gearRatio}`);
    total += gearRatio;
  }
}

console.log(`Second Answer: ${total}`);
