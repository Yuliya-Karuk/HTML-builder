const fsPromises = require('fs').promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'files');
const destinationPath = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fsPromises.rm(destinationPath, { force: true, recursive: true });
    await fsPromises.mkdir(destinationPath, { recursive: true });
    const files = await fsPromises.readdir(
      sourcePath,
      { withFileTypes: true },
      (error, files) => {
        return files;
      },
    );
    files.forEach((file) => {
      const fileStartPath = path.join(sourcePath, file.name);
      const fileDestinationPath = path.join(destinationPath, file.name);
      fsPromises.copyFile(fileStartPath, fileDestinationPath);
    });
  } catch (error) {
    console.log(error.message);
  }
}

copyDir();
