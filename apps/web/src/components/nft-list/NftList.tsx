import { List, message } from 'antd'
import { useReadContract } from 'wagmi'
import { NFTCard, useAccount } from '@ant-design/web3'

import type { NftItem } from '../../types'
import { RAIG_ADDR } from '../../constants'
import abis from '../../abis'

import NftCardFooter from './NftCardFooter'

function NftList() {
  const { account: signer } = useAccount()
  const [messageApi, contextHolder] = message.useMessage()
  const result = useReadContract({ abi: abis.RaiGallery, address: RAIG_ADDR, functionName: 'getAll' })
  const nfts = (result.data || []) as NftItem[]

  const handleBuy = () => {
    if (!signer) {
      return messageApi.warning('Please connect wallet first.')
    }

    messageApi.info(signer.address)
  }

  return (
    <>
      {contextHolder}
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
        dataSource={nfts}
        renderItem={nft => (
          <List.Item>
            <NFTCard
              key={`${nft.nftContract}#${nft.tokenId}`}
              tokenId={nft.tokenId}
              price={{ value: nft.price, decimals: 2, symbol: 'RAIC' }}
              image={nft.tokenUrl || 'https://api.our-metaverse.xyz/ourms/6_pnghash_0cecc6d080015b34f60bdd253081f36e277ce20ceaf7a6340de3b06d2defad6a_26958469.webp'}
              footer={<NftCardFooter dataSource={nft} />}
              showAction
              actionText={signer && nft.seller === signer.address ? 'Unlist' : 'Buy'}
              onActionClick={handleBuy}
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default NftList
