const fs = require("fs");
const path = require("path");
const dirname = path.join(__dirname, "secret-folder");

fs.readdir(dirname, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  files.forEach(function (file) {
    fs.stat(path.join(dirname, file), (err, stats) => {
      if (err) {
        console.log(err + "path");
      }
      if (stats.isFile()) {
        console.log(
          `file name: ${file.slice(0, file.indexOf("."))} -- extension: ${path
            .extname(file)
            .slice(1, path.extname(file).length)} -- file size: ${
            stats.size / 1000
          }kb`
        );
      }
    });
  });
});
