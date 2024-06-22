import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const INITIAL_SUPPLY = 999_000_000_000_000_000_000n;

export default buildModule('RaiCoin', m => {
  const coin = m.contract('RaiCoin', [INITIAL_SUPPLY]);

  return { coin };
});
