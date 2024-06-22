import { useState } from 'react'
import { List } from 'antd'
import { NFTCard } from '@ant-design/web3'

function NftList() {
  const [nfts] = useState(Array.from(new Array(6)).map((_, idx) => ({ uuid: `${Date.now().toString(32)}${idx}`, tokenId: idx + 1 })))

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        xl: 6
      }}
      dataSource={nfts}
      renderItem={nft => (
        <List.Item>
          <NFTCard
            key={nft.uuid}
            name={`NFT ${nft.uuid}`}
            tokenId={nft.tokenId}
            price={{
              value: 1230000000000000000n,
            }}
            image="https://api.our-metaverse.xyz/ourms/6_pnghash_0cecc6d080015b34f60bdd253081f36e277ce20ceaf7a6340de3b06d2defad6a_26958469.webp"
            showAction
          />
        </List.Item>
      )}
    />
  )
}

export default NftList
