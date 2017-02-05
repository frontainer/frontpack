const chalk = require('chalk');
const getDirs = require('./getDirs');
const execSync = require('child_process').execSync;

console.log(chalk.blue('install - ./'));
execSync(`npm i`, {
  stdio: 'inherit'
});
getDirs('preset').then((list) => {
  list.forEach((d) => {
    console.log(chalk.blue(`install - ${d}`));
    execSync(`npm i`, {
      cwd: d,
      stdio: 'inherit'
    })
  });
}).catch((e) => {
  console.error(e);
});