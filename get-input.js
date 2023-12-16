// Get the input data from https://adventofcode.com/AOC_YEAR/day/DAY_NUMBER/input
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const fetch = require("node-fetch-commonjs");

const args = require("minimist")(process.argv.slice(2), {
  string: ["day"],
  alias: {
    day: "d",
  },
  "--": true,
});

dotenv.config();

const AOC_YEAR = process.env.AOC_YEAR || new Date().getFullYear();
const DAY_NUMBER =
  args._[0] ||
  process.env.DAY_NUMBER ||
  Math.ceil(
    (new Date() - new Date(`${AOC_YEAR}-11-30T00:00:00-05:00`)) /
      (1000 * 3600 * 24)
  );
const SESSION_COOKIE = process.env.AOC_SESSION_COOKIE;

const url = `https://adventofcode.com/${AOC_YEAR}/day/${DAY_NUMBER}/input`;

// Create the folder for the day if it does not exist
const dir = path.join(
  __dirname,
  `${DAY_NUMBER.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`
);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Get the input data from https://adventofcode.com/AOC_YEAR/day/DAY_NUMBER/input

fetch(url, {
  headers: {
    cookie: `session=${SESSION_COOKIE}`,
  },
})
  .then((res) => res.text())
  .then((data) => {
    fs.writeFileSync(path.join(dir, "data.txt"), data.trim());
  });
