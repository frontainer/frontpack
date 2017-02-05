const chalk = require('chalk');
const getDirs = require('./getDirs');
const execSync = require('child_process').execSync;

console.log(chalk.blue('checking - ./'));
execSync(`npm-check -u`, {
  stdio: 'inherit'
});
getDirs('preset').then((list) => {
  list.forEach((d) => {
    console.log(chalk.blue(`checking - ${d}`));
    execSync(`npm-check -u`, {
      cwd: d,
      stdio: 'inherit'
    })
  });
}).catch((e) => {
  console.error(e);
});