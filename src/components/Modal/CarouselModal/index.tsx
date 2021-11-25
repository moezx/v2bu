import type { FC } from 'react'
import { Modal } from 'antd'
import MarkdownIt from 'markdown-it'

const mdParser = new MarkdownIt({ html: true })

export interface carouseModalProps {
  title: string
  visible: boolean
  onCancel: () => void
}

const CarouseModal: FC<carouseModalProps> = (props) => {
  const { title, visible, onCancel, children } = props
  return (
    <>
      <Modal title={title} footer={null} visible={visible} onCancel={onCancel}>
        <div dangerouslySetInnerHTML={{ __html: mdParser.render(children as string) }} />
      </Modal>
    </>
  )
}

export default CarouseModal
