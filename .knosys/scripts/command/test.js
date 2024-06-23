const { createAppScriptExecutor } = require('../helper');

module.exports = {
  execute: createAppScriptExecutor(({ app, exec }) => {
    if (app !== 'chain') {
      return;
    }

    return exec('pnpm run test');
  }, 'chain'),
};
