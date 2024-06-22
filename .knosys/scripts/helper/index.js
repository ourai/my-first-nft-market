const { existsSync } = require('fs');
const { execSync } = require('child_process');
const { isFunction } = require('@ntks/toolbox');

const ksUtils = require('./knosys');

function resolveAppPath(appDirName) {
  return `${ksUtils.resolveRootPath()}/apps/${appDirName}`;
}

function executeCommandInAppDir(appPath, cmd) {
  return execSync(cmd, { cwd: appPath, stdio: 'inherit' })
}

function createAppScriptExecutor(handler, defaultApp = 'web') {
  return (app = defaultApp, ...args) => {
    const appPath = resolveAppPath(app);

    if (!existsSync(appPath) || !isFunction(handler)) {
      return;
    }

    handler({ app, appRoot: appPath, exec: executeCommandInAppDir.bind(null, appPath) }, ...args);
  };
}

module.exports = {
  ...ksUtils,
  resolveAppPath,
  executeCommandInAppDir,
  createAppScriptExecutor,
};
