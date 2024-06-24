const { join: joinPath } = require('path');
const { existsSync } = require('fs');

const { createAppScriptExecutor } = require('../helper');

module.exports = {
  execute: createAppScriptExecutor(({ app, appRoot, exec }, ...args) => {
    if (app !== 'chain') {
      return;
    }

    const [moduleName, networkName, needReset] = args;
    const moduleRelativePath = `./ignition/modules/${moduleName}.ts`;

    if (!existsSync(joinPath(appRoot, moduleRelativePath))) {
      return;
    }

    const cmds = ['pnpm run deploy', `"${moduleRelativePath}"`];

    if (networkName) {
      cmds.push(`--network ${networkName}`);
    }

    if (needReset) {
      cmds.push('--reset');
    }

    return exec(cmds.join(' '));
  }, 'chain'),
};
