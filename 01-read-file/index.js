const fs = require("fs");
const path = require("path");
const dirname = path.join("./01-read-file/text.txt");
const readStream = fs.createReadStream(dirname);
readStream.on("data", (chunk) => {
  console.log(chunk.toString());
});
