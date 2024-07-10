const { existsSync } = require('fs');
const { execSync } = require('child_process');
const { isFunction } = require('@ntks/toolbox');

const ksUtils = require('./knosys');

function resolveAppPath(appDirName) {
  return `${ksUtils.resolveRootPath()}/apps/${appDirName}`;
}

function executeCommandInAppDir(appPath, cmd) {
  return execSync(cmd, { cwd: appPath, stdio: 'inherit' });
}

function createAppScriptExecutor(handler, defaultApp = 'web', notExistsAllowed = false) {
  return (app = defaultApp, ...args) => {
    if (!isFunction(handler)) {
      return;
    }

    const appPath = resolveAppPath(app);

    if (notExistsAllowed !== true && !existsSync(appPath)) {
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
