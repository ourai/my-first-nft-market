const ksUtils = require('./knosys');

function resolveAppPath(appDirName) {
  return `${ksUtils.resolveRootPath()}/apps/${appDirName}`;
}

module.exports = {
  ...ksUtils,
  resolveAppPath,
};
