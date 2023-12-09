const fs = require("fs");

// read contents of the file
const data = fs.readFileSync("01/data.txt", "UTF-8");
// const data = fs.readFileSync("01/data-sample.txt", "UTF-8");
const lines = data.split(/\r?\n/);

// Convert words to numbers
const wordToNum = (str) => {
  const legend = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  var x = legend.indexOf(str);
  if (x < 0) {
    return str;
  }
  return x;
};

// Second Answer
try {
  // set variables
  var total = 0;
  // print all lines
  lines.forEach((line) => {
    const regex = /(?=(\d|zero|one|two|three|four|five|six|seven|eight|nine))/g;
    const match = [...line.matchAll(regex)];
    let thenum = 0;
    thenum +=
      10 * wordToNum(match[0][1]) + 1 * wordToNum(match[match.length - 1][1]);
    total += thenum;
    // console.log(line, thenum);
  });
} catch (err) {
  console.error(err);
}
console.log("Second Answer = ", total);
