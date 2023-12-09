const fs = require("fs");

// read contents of the file
const data = fs.readFileSync("01/data.txt", "UTF-8");
// const data = fs.readFileSync("01/data-sample.txt", "UTF-8");
const lines = data.split(/\r?\n/);

// First Answer
try {
  // set variables
  var total = 0;
  // print all lines
  lines.forEach((line) => {
    const firstDigit = /^\D*(\d).*$/;
    const lastDigit = /^.*(\d)\D*$/;
    total += 10 * line.match(firstDigit)[1] + 1 * line.match(lastDigit)[1];
  });
} catch (err) {
  console.error(err);
}
console.log("First Answer = ", total);
