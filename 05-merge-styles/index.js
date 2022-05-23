const fs = require("fs");
const path = require("path");
const bundlePath = path.join(__dirname, "./project-dist/bundle.css");
const sourcePath = path.join(__dirname, "styles");

const writeToFile = (inputeFile, outputFile) => {
  const readStream = fs.createReadStream(inputeFile);
  const writeStream = fs.createReadStream(outputFile);
  readStream.on("data", (chunk) => {
    fs.appendFile(outputFile, `${chunk.toString()} \n`, (err) => {
      if (err) throw err;
    });
  });
};

const createFile = () => {
  fs.writeFile(bundlePath, "", (err) => {
    if (err) {
      throw err;
    }
  });
};
createFile();
fs.rm(bundlePath, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
  createBundleCss();
});

function createBundleCss() {
  fs.readdir(sourcePath, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    createFile();
    files.forEach((file) => {
      fs.stat(path.join(sourcePath, file), (err, stats) => {
        if (err) {
          console.log(err + "path");
        }
        if (stats.isFile()) {
          if (path.extname(file) === ".css") {
            writeToFile(path.join(sourcePath, file), bundlePath);
          }
        }
      });
    });
  });
}
