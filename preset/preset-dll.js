const partials = [
  'common',
  'typescript',
  'babel',
  'dll'
];
module.exports = function(fp) {
  return fp.load(partials);
};