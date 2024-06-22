import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import RaiCoin from './RaiCoin';

export default buildModule('RaiGallery', m => {
  const { coin } = m.useModule(RaiCoin);
  const gallery = m.contract('RaiGallery', [coin]);

  return { gallery };
});
