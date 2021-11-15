import type { FC } from 'react'
import { Modal } from 'antd'
import QRcode from 'qrcode.react'

export interface qrcodeModalProps {
  visible: boolean
  url: string
  title?: React.ReactNode
  footer?: React.ReactNode
  onCancel?: () => void
}

const QRcodeModal: FC<qrcodeModalProps> = (props) => {
  const { visible, url, footer, title, onCancel } = props
  return (
    <>
      <Modal
        title={title ?? null}
        centered={true}
        visible={visible}
        closable={false}
        zIndex={1200}
        width={300}
        footer={footer ?? null}
        onCancel={onCancel}
      >
        <QRcode value={url} size={250} includeMargin={false} renderAs="svg" />,
      </Modal>
    </>
  )
}

export default QRcodeModal
