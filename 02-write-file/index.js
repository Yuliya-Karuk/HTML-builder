const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;

const pathToFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathToFile);

process.on('exit', () => stdout.write('Good luck learning Node.js!'));
process.on('SIGINT', () => process.exit());

stdout.write('Hi! We are learning Node.js. Enter some information:\n');
stdin.on('data', (chunk) => {
  if (chunk.toString().includes('exit')) process.exit();
  output.write(chunk);
});
