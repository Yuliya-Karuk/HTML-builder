const fsPromises = require('fs').promises;
const fs = require('fs');
const path = require('path');

const projectFolder = 'project-dist';

async function createFolder() {
  const destinationPath = path.join(__dirname, projectFolder);
  await fsPromises.mkdir(destinationPath, { recursive: true });
}

async function bundleStyles() {
  const sourcePath = path.join(__dirname, 'styles');
  const bundleFile = path.join(__dirname, projectFolder, 'style.css');

  const files = await fsPromises.readdir(
    sourcePath,
    { withFileTypes: true },
    (err, files) => {
      return files;
    },
  );

  const writeStream = fs.createWriteStream(bundleFile);

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(sourcePath, file.name);
      const fileExtension = path.extname(filePath);
      if (fileExtension === '.css') {
        const readStream = fs.createReadStream(filePath, 'utf-8');

        readStream.pipe(writeStream);
      }
    }
  });
}

createFolder();
bundleStyles();
