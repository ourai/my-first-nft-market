const { createAppScriptExecutor } = require('../helper');

module.exports = {
  execute: createAppScriptExecutor(({ app, exec }) => {
    if (app === 'web') {
      return exec('pnpm run dev');
    }

    if (app === 'chain') {
      return exec('pnpm start');
    }
  }),
};
