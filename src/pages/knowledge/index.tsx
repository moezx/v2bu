import type { FC } from 'react'
import KnowLedge from '@/components/Knowledge'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import { knowledges } from '@/services'
import { LoadingOutlined } from '@ant-design/icons'
import { getLocale } from 'umi'

const KnowledgePage: FC = () => {
  const [userKnowledges, setUserKnowledges] = useState<API.User.KnowledgesResult>()
  const [userCategories, setUserCategories] = useState<string[]>([])
  useEffect(() => {
    ;(async () => {
      const knowledgesResult = await knowledges({ language: getLocale() })
      if (knowledgesResult === undefined) {
        return
      }

      setUserKnowledges(knowledgesResult)
      let categories: string[] = []

      Object.keys(knowledgesResult.data).forEach((category) => {
        categories = [...categories, category]
      })
      setUserCategories(categories)
    })()
  }, [])

  return (
    <>
      <div className="content content-full">
        {userKnowledges !== undefined ? (
          <KnowLedge
            categories={userCategories}
            knowledges={userKnowledges as API.User.KnowledgesResult}
          />
        ) : (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        )}
      </div>
    </>
  )
}
export default KnowledgePage
