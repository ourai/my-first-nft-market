import type { PropsWithChildren } from 'react'
import { createConfig, http } from 'wagmi'
import { hardhat } from 'wagmi/chains'
import { WagmiWeb3ConfigProvider, MetaMask, OkxWallet, Hardhat } from '@ant-design/web3-wagmi'

const config = createConfig({
  chains: [hardhat],
  transports: {
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
