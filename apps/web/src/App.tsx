import { EthersWeb3ConfigProvider, MetaMask, OkxWallet } from '@ant-design/web3-ethers'
import { Connector, ConnectButton } from '@ant-design/web3'
import NftList from './components/nft-list'
import './App.css'

function App() {
  return (
    <EthersWeb3ConfigProvider wallets={[MetaMask(), OkxWallet()]}>
      <Connector>
        <ConnectButton />
      </Connector>
      <NftList />
    </EthersWeb3ConfigProvider>
  )
}

export default App
