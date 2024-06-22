import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('RaiE', m => {
  const nft = m.contract('RaiE');

  return { nft };
});
