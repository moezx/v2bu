import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useModel, Link } from 'umi'
import type { listItem } from './_List'
import List from './_List'
import { servers } from '@/services'
import Top from './_Top'
import moment from 'moment'
import { Tag, Badge, Space } from 'antd'
import { useIntl } from 'umi'

const SubscribePage: FC = () => {
  const { initialState } = useModel('@@initialState')
  const renewPlanPath = `/plan/${initialState?.currentUser?.data.plan_id}`
  const [userDataSource, setUserDataSource] = useState<listItem[]>()
  const [initialized, setInitialized] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    ;(async () => {
      const serversResult = await servers()
      const dataSource: listItem[] = []
      if (serversResult === undefined) {
        return
      }
      serversResult.data.map((item: API.User.ServerItem) => {
        const data: listItem = {} as listItem
        data.key = `${item.type}-${item.id.toString()}`
        data.name = item.name
        data.rate = (
          <Tag style={{ minWidth: 60 }}>
            <Space>{item.rate}x</Space>
          </Tag>
        )
        if (item.tags instanceof Array) {
          data.tags = item.tags.map((tagItem: any, tagIndex: number) => {
            const tagKey: number = tagIndex
            return (
              <React.Fragment key={tagKey}>
                <Tag>{tagItem}</Tag>
              </React.Fragment>
            )
          })
        } else {
          data.tags = <></>
        }

        if (item.last_check_at != null && moment().unix() - Number(item.last_check_at) <= 300) {
          data.status = <Badge status="processing" />
        } else {
          data.status = <Badge status="error" />
        }
        dataSource.push(data)
        return item
      })
      if (dataSource.length > 0) {
        setUserDataSource(dataSource)
      }
      setInitialized(true)
    })()
  }, [])

  const renderRenewInfo = () => (
    <>
      <div className="alert alert-dark" role="alert">
        <Space>
          {intl.formatMessage({ id: 'subscribe.renew_info' })}
          <Link className="alert-link" to={renewPlanPath}>
            {intl.formatMessage({ id: 'subscribe.renew' })}
          </Link>
        </Space>
      </div>
    </>
  )

  return (
    <>
      <div className="content content-full">
        {initialized && <Top />}
        {userDataSource && (initialState?.currentUser?.data.plan_id as number) > 0 && (
          <List dataSource={userDataSource} />
        )}
        {initialized &&
          userDataSource === undefined &&
          (initialState?.currentUser?.data.plan_id as number) > 0 &&
          renderRenewInfo()}
      </div>
    </>
  )
}
export default SubscribePage
