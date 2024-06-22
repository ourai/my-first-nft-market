const { existsSync } = require('fs');
const { execSync } = require('child_process');
const { resolveAppPath } = require('../helper');

module.exports = {
  execute: (app = 'web') => {
    const appPath = resolveAppPath(app);

    if (!existsSync(appPath)) {
      return;
    }

    const opts = { cwd: appPath, stdio: 'inherit' };

    if (app === 'web') {
      return execSync('pnpm run dev', opts);
    }

    if (app === 'chain') {
      return execSync('pnpm start', opts);
    }
  },
};
