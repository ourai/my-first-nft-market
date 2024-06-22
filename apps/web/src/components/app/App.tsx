import { Layout, Flex, Space } from 'antd'
import { EthersWeb3ConfigProvider, MetaMask, OkxWallet } from '@ant-design/web3-ethers'
import { Connector, ConnectButton } from '@ant-design/web3'
import SellButton from '../sell-button'
import NftList from '../nft-list'
import './style.css'

function App() {
  const containerStyle = { maxWidth: 1280, margin: '0 auto' }

  return (
    <EthersWeb3ConfigProvider wallets={[MetaMask(), OkxWallet()]}>
      <Layout>
        <Layout.Header style={{ backgroundColor: '#ccc' }}>
          <Flex align="center" justify="space-between" style={containerStyle}>
            <div style={{ fontSize: 24 }}>Ouraiverse</div>
            <Space>
              <SellButton />
              <Connector>
                <ConnectButton size="large" />
              </Connector>
            </Space>
          </Flex>
        </Layout.Header>
        <Layout.Content>
          <div style={{ ...containerStyle, padding: 24 }}>
            <NftList />
          </div>
        </Layout.Content>
      </Layout>
    </EthersWeb3ConfigProvider>
  )
}

export default App
