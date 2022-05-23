const fs = require("fs");
const path = require("path");
const sourcePath = path.join(__dirname, "files");
const sourceCopyPath = path.join(__dirname, "files-copy");
createCopyFolder();
fs.rm(sourceCopyPath, { recursive: true }, (err) => {
  if (err) {
    throw err;
  }
  copyDir();
});

function copyDir() {
  createCopyFolder();
  fs.readdir(sourcePath, (error, files) => {
    if (error) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach((file) => {
      fs.stat(path.join(sourcePath, file), (err, stats) => {
        if (err) {
          console.log(err + "path");
        }
        if (stats.isFile()) {
          fs.copyFile(
            path.join(sourcePath, file),
            path.join(sourceCopyPath, file),
            (error) => {
              if (error) {
                return console.log(error);
              }
            }
          );
        }
      });
    });
    console.log("all files have been copyed to files-copy direction");
  });
}
function createCopyFolder() {
  fs.mkdir(sourceCopyPath, { recursive: true }, (err) => {
    if (err) {
      throw err;
    }
  });
}
