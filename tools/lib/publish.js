const getDirs = require('./getDirs');
const whoami = require('./npm/whoami');
const publish = require('./npm/publish');

whoami().then(() => {
  return getDirs('preset');
}).then((list) => {
  return publish(list);
}).then(() => {
  console.log('Published!!');
}).catch((e) => {
  console.error(e);
});