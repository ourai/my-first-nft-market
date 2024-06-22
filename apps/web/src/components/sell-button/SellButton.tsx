import { useState } from 'react'
import { Button, Modal, Form, Input, InputNumber } from 'antd'
import { useEthersSigner } from '@ant-design/web3-ethers'

import type { NftItem } from '../../types'

function SellButton() {
  const [dialogShown, setDialogShown] = useState(false)
  const signer = useEthersSigner()
  const [form] = Form.useForm()

  const handleSell = () => {
    if (!signer) {
      return alert('请先连接钱包')
    }

    setDialogShown(true)
  }

  const handleClose = () => {
    form.resetFields()
    setDialogShown(false)
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue()

    if (values.price === 0) {
      return alert('NFT price can not be 0.')
    }

    console.log({ seller: signer?.address, ...values })

    handleClose()
  }

  return (
    <>
      <Button type="primary" size="large" onClick={handleSell}>Sell</Button>
      <Modal title="Sell new NFT" open={dialogShown} onOk={() => form.submit()} onCancel={handleClose}>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={handleSubmit}>
          <Form.Item label="Contract" name="contract" rules={[{ required: true, message: 'Please input NFT contract!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Token ID" name="tokenId" rules={[{ required: true, message: 'Please input NFT token ID!' }]}>
            <InputNumber min={1} precision={0} addonBefore="#" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input NFT price!' }]}>
            <InputNumber min={0} addonAfter="RAIC" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default SellButton
