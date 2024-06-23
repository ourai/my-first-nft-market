import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('RaiCoin', m => {
  const coin = m.contract('RaiCoin', [1_000_000]);

  return { coin };
});
