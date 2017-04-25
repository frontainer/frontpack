const chalk = require('chalk');
const getDirs = require('./getDirs');
const execSync = require('child_process').execSync;

console.log(chalk.blue('install - ./'));
getDirs('preset').then((list) => {
  list.forEach((d) => {
    console.log(chalk.blue(`install - ${d}`));
    execSync(`yarn upgrade`, {
      cwd: d,
      stdio: 'inherit'
    })
  });
}).catch((e) => {
  console.error(e);
});