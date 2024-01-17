const path = require('path');
const fs = require('fs');

const pathToFolder = path.join(__dirname, 'secret-folder');

function writeFileParams(fileName, fileExtension, filePath) {
  fs.stat(filePath, (error, stats) => {
    if (error) console.log(error.message);
    console.log(`${fileName} - ${fileExtension} - ${stats.size / 1000}kb`);
    return stats.size;
  });
}

fs.readdir(pathToFolder, { withFileTypes: true }, (error, files) => {
  if (error) console.log(error.message);
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(pathToFolder, file.name);
      const fileExtension = path.extname(filePath).slice(1);
      const fileName = file.name.replace(`.${fileExtension}`, '');
      writeFileParams(fileName, fileExtension, filePath);
    }
  });
});
