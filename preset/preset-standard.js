const partials = [
  'common',
  'style',
  'typescript',
  'babel',
  'html',
  'server',
  'copy',
  'sprite',
  process.env.NODE_ENV === 'production' ? 'production' : 'develop'
];
module.exports = function(fp) {
  return fp.load(partials);
};