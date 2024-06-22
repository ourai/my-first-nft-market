import { useState } from 'react'
import { List } from 'antd'
import { NFTCard } from '@ant-design/web3'
import { useEthersSigner } from '@ant-design/web3-ethers'

import type { NftItem } from '../../types'

type NftListDataSource = (NftItem & { uuid: string })[]

function mockNfts(): NftListDataSource {
  return Array.from(new Array(6)).map((_, idx) => ({
    uuid: `${Date.now().toString(32)}${idx}`,
    seller: idx === 1 ? '0xb3C88697d659FF8012872967F46c492d12457242' : '',
    contract: '',
    tokenId: idx + 1,
    price: BigInt(99 - idx + 1)
  }))
}

function NftList() {
  const signer = useEthersSigner()
  const [nfts] = useState<NftListDataSource>(mockNfts())

  const handleBuy = () => {
    if (!signer) {
      return alert('请先连接钱包')
    }

    alert(signer.address)
  }

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 4 }}
      dataSource={nfts}
      renderItem={nft => (
        <List.Item>
          <NFTCard
            key={nft.uuid}
            tokenId={nft.tokenId}
            price={{ value: nft.price }}
            image="https://api.our-metaverse.xyz/ourms/6_pnghash_0cecc6d080015b34f60bdd253081f36e277ce20ceaf7a6340de3b06d2defad6a_26958469.webp"
            showAction
            actionText={signer && nft.seller === signer.address ? 'Unlist' : 'Buy'}
            onActionClick={handleBuy}
          />
        </List.Item>
      )}
    />
  )
}

export default NftList
