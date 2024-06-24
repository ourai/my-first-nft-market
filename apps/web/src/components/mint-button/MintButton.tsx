import { Button, message } from 'antd'
import { useAccount } from '@ant-design/web3'
import { useWriteContract } from 'wagmi'

import { RAIE_ADDR } from '../../constants'
import abis from '../../abis'

function MintButton() {
  const { account } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const [messageApi, contextHolder] = message.useMessage()

  const handleMint = () => {
    if (!account) {
      return messageApi.warning('Please connect wallet first.')
    }

    writeContractAsync({
      abi: abis.RaiE,
      address: RAIE_ADDR,
      functionName: 'mint',
    }).then(res => {
      messageApi.success(`Mint success: ${res}`)
    }).catch(err => {
      messageApi.error('Mint failed')
      console.log('err', err.message)
    })
  }

  return (
    <>
      {contextHolder}
      <Button size="large" onClick={handleMint}>Mint</Button>
    </>
  )
}

export default MintButton
