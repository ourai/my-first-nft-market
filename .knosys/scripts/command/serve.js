const { join: joinPath } = require('path');
const { existsSync, readdirSync } = require('fs');

const { isDirectory, readData, saveData, createAppScriptExecutor } = require('../helper');

function copyChainArtifacts(appRoot) {
  const artifactRoot = joinPath(appRoot, '..', 'chain', 'artifacts', 'contracts');

  if (!existsSync(artifactRoot)) {
    return;
  }

  const contracts = {};

  readdirSync(artifactRoot).forEach(dirName => {
    const dirPath = `${artifactRoot}/${dirName}`;

    if (dirName.startsWith('.') || !isDirectory(dirPath)) {
      return;
    }

    const contractName = dirName.replace('.sol', '');

    contracts[contractName] = readData(joinPath(dirPath, `${contractName}.json`)).abi;
  });

  if (Object.keys(contracts).length === 0) {
    return;
  }

  saveData(joinPath(appRoot, 'src', 'abis.ts'), `export default ${JSON.stringify(contracts, null, 2)};\n`);
}

module.exports = {
  execute: createAppScriptExecutor(({ app, appRoot, exec }) => {
    if (app === 'web') {
      copyChainArtifacts(appRoot);

      return exec('pnpm run dev');
    }

    if (app === 'chain') {
      return exec('pnpm start');
    }
  }),
};
