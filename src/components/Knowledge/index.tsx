import type { FC } from 'react'
import React, { useState } from 'react'
import { knowledge } from '@/services'
import { Drawer, Result, Button} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import moment from 'moment'
import { Link, useIntl, history, useModel} from 'umi'
import MarkdownIt from 'markdown-it'

const mdParser = new MarkdownIt({ html: true })

export interface KnowLedgeProps {
  knowledges: API.User.KnowledgesResult
  categories: string[]
}

const KnowLedge: FC<KnowLedgeProps> = (props) => {
  const { knowledges, categories } = props
  const [userKnowledge, setUserKnowledge] = useState<API.User.KnowledgeResult>()
  const [visible, setVisible] = useState(false)
  const [lock, setLock] = useState(false)
  const {subState} = useModel('useSubModel')
  const intl = useIntl()

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
    setUserKnowledge(undefined)
  }


  const showDetailHandler = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: API.User.KnowledgeItem,
  ) => {
    ;(async () => {
      e.preventDefault()
      console.log(subState)

      if (item.free === 1 || (subState.planID !== undefined && subState.planID > 0 )) {
        const knowLedgeResult = await knowledge({ id: item.id })
        if (knowLedgeResult === undefined) {
          return
        }
        setUserKnowledge(knowLedgeResult)
        setLock(false)
      } else {
        setLock(true)
      }

      showDrawer()
    })()
  }

  return (
    <>
      {categories &&
        categories.map((category, categoryIndex) => {
          const categoryKey: number = categoryIndex
          return (
            <div className="row" key={categoryKey}>
              <div className="col-md-12">
                <div className="block block-rounded block-bordered">
                  <div className="block-header block-header-default">
                    <h3 className="block-title">{category}</h3>
                  </div>
                  <div className="list-group">
                    {knowledges?.data[category].map(
                      (knowledgeItem: API.User.KnowledgeItem, knowledgeIndex: number) => {
                        return (
                          <Link
                            className="list-group-item list-group-item-action"
                            key={knowledgeIndex}
                            to="#"
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                              showDetailHandler(e, knowledgeItem)
                            }}
                          >
                            <h5 className="font-size-base mb-1">{knowledgeItem.title}</h5>
                            <small>
                              {intl.formatMessage({ id: 'knowledge.last_update' })}:
                              {moment.unix(Number(knowledgeItem.updated_at)).format('l')}
                            </small>
                          </Link>
                        )
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      <Drawer
        title={lock ? "" : userKnowledge?.data.title ?? 'Loading...'}
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        width="80%"
      >
        {lock === false &&(userKnowledge?.data.body !== undefined ? (
          <div
            dangerouslySetInnerHTML={{ __html: mdParser.render(userKnowledge.data.body as string) }}
          ></div>
        ) : (
          <LoadingOutlined />
        ))}

        {lock === true && (
          <Result
            title={intl.formatMessage({id:'knowledge.lock.title'})}
            extra={
              <Button type="primary" onClick={(e:React.MouseEvent)=>{
                e.preventDefault()
                history.push('/plan')
              }}>
                {intl.formatMessage({id:'knowledge.lock.btn'})}
              </Button>
            }
          />
        )}
      </Drawer>
    </>
  )
}

export default KnowLedge
