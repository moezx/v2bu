import './style.less'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import CarouseModal from '@/components/Modal/CarouselModal'
import { notice } from '@/services'
import { useIntl } from 'umi'

import moment from 'moment'

const Notice: FC = () => {
  const [userNotices, setUserNotices] = useState<API.User.NoticeItem[]>()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showNotice, setShowNotice] = useState<API.User.NoticeItem>()
  const intl = useIntl()
  useEffect(() => {
    ;(async () => {
      const noticeResult = await notice()
      if (noticeResult === undefined || noticeResult.data === undefined) {
        return
      }
      setUserNotices(noticeResult.data)
    })()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const cancelModalHandler = () => {
    setIsModalVisible(false)
  }

  const clickHandler = (record: API.User.NoticeItem) => {
    setShowNotice(record)
    showModal()
  }

  return (
    <>
      <Carousel autoplay>
        {userNotices &&
          userNotices.map((noticeItem) => (
            <div key={noticeItem.id}>
              <a
                className="block block-rounded bg-image mb-0 v2board-bg-pixels"
                href="#"
                style={{
                  backgroundImage: `url(${noticeItem.img_url})`,
                  backgroundSize: 'cover',
                }}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  clickHandler(noticeItem)
                }}
              >
                <div className="block-content bg-black-50">
                  <div className="mb-5 mb-sm-7 d-sm-flex justify-content-sm-between align-items-sm-center">
                    <p>
                      <span className="badge badge-danger font-w700 p-2 text-uppercase">
                        {intl.formatMessage({ id: 'dashboard.notice.announcement' })}
                      </span>
                    </p>
                  </div>
                  <p className="font-size-lg font-w700 text-white mb-1">{noticeItem.title}</p>
                  <p className="font-w600 text-white-75">
                    {moment.unix(Number(noticeItem.created_at)).format('YYYY-MM-DD')}
                  </p>
                </div>
              </a>
            </div>
          ))}
      </Carousel>
      {showNotice !== undefined && (
        <CarouseModal
          title={showNotice.title}
          visible={isModalVisible}
          onCancel={cancelModalHandler}
        >
          {showNotice.content}
        </CarouseModal>
      )}
    </>
  )
}
export default Notice
