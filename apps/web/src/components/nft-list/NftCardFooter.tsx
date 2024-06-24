import type { PropsWithChildren } from 'react'
import { Address } from '@ant-design/web3'

import type { NftItem } from '../../types'
import dayjs from 'dayjs'

type NftCardFooterProps = PropsWithChildren<{ dataSource: NftItem }>

function NftCardFooter(props: NftCardFooterProps) {
  const { dataSource } = props

  return (
    <>
      <Address address={dataSource.nftContract} ellipsis={{ headClip: 8, tailClip: 6 }} copyable />
      <div>#{Number(dataSource.tokenId)}</div>
      <Address address={dataSource.seller} ellipsis={{ headClip: 8, tailClip: 6 }} copyable />
      <div>{dayjs(Number(dataSource.listedAt) * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
    </>
  )
}

export default NftCardFooter
