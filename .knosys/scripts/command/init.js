const { execSync } = require('child_process');

const { resolveRootPath, createAppScriptExecutor } = require('../helper');

module.exports = {
  execute: createAppScriptExecutor(({ app }) => {
    if (app !== 'graph') {
      return;
    }

    const cmds = [
      'graph init',
      '--network sepolia',
      '--protocol ethereum',
      '--from-contract 0x17cB0240c669c988E2529077DFa98ff8A22c92fe',
      '--contract-name RaiGallery',
      '--abi .tmp/abis/RaiGallery.json',
      '--index-events',
      '--skip-git',
      '--studio',
      'rai-gallery',
      'apps/graph',
    ];

    execSync(cmds.join(' '), { cwd: resolveRootPath(), stdio: 'inherit' });
  }, 'graph', true),
};
