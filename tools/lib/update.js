const getDirs = require('./getDirs');
const whoami = require('./npm/whoami');
const update = require('./npm/update');

const argv = process.argv;

if (argv.length !== 3) {
  throw new RangeError('Arguments RangeError: ./update.js [patch|minor|major|patch|preminor|prepatch|prerelease|<version>]')
}

console.log(argv);
const type = argv[2];

whoami().then(() => {
  return getDirs('preset');
}).then((list) => {
  return update(list, type);
}).then(() => {
  console.log('Updated!!');
}).catch((e) => {
  console.error(e);
});