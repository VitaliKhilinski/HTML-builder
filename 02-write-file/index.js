const fs = require("fs");
const path = require("path");
const readline = require("readline");
const dirname = path.join("./02-write-file/text.txt");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeToFile = (userInput) => {
  fs.appendFile(dirname, `${userInput} \n`, (err) => {
    if (err) throw err;
  });
};

rl.question("You should write something \n", (userInput) => {
  writeToFile(userInput);
  if (userInput.trim() === "exit") {
    rl.close();
  }
  rl.on("line", (userInput) => {
    if (userInput.trim() === "exit") {
      rl.close();
    } else writeToFile(userInput);
  });
  rl.on("close", () => {
    console.log("All your rows have been added to the file text.txt");
  });
});
