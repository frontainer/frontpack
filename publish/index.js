const whoami = require('./whoami');
const getDirs = require('./getDirs');
const update = require('./update');
const publish = require('./publish');

const argv = process.argv;
const VERSIONS = [
  'patch',
  'minor',
  'major',
  'premajor',
  'preminor',
  'prepatch'
];

if (argv.length !== 3 || VERSIONS.indexOf(argv[2]) === -1) {
  throw new RangeError('Arguments RangeError: ./publish.js [patch|minor|major|patch|preminor|prepatch|prerelease]')
}

const type = argv[2];

whoami().then(() => {
  return getDirs('preset');
}).then((list) => {
  return update(list, type);
}).then((list) => {
  return publish(list);
}).then(() => {
  console.log('Published!!');
}).catch((e) => {
  console.error(e);
});