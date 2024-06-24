import type { PropsWithChildren } from 'react'
import { createConfig, http } from 'wagmi'
import { mainnet, hardhat } from 'wagmi/chains'
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Hardhat } from '@ant-design/web3-wagmi'

const config = createConfig({
  chains: [/*mainnet, */hardhat],
  transports: {
    // [mainnet.id]: http(),
    [hardhat.id]: http()
  }
})

function Container(props: PropsWithChildren) {
  return (
    <WagmiWeb3ConfigProvider
      config={config}
      chains={[Hardhat]}
      wallets={[MetaMask(), OkxWallet()]}
      eip6963={{ autoAddInjectedWallets: true }}
    >
      {props.children}
    </WagmiWeb3ConfigProvider>
  )
}

export default Container
