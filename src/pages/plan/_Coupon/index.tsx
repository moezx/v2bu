import './style.less'
import type { FC } from 'react'
import React from 'react'
import { useRef, useState } from 'react'
import { useDebounceFn } from 'ahooks'
import { couponCheck } from '@/services'
import { useIntl } from 'umi'

export interface couponProps {
  planID: number
  onCheckSuccess: (values: couponValues) => void
}

export interface couponValues {
  planID: number
  type: number
  value: number
  name: string
  code: string
}

const Coupon: FC<couponProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { planID, onCheckSuccess } = props
  const [lastCheckCode, setLastCheckCode] = useState('')
  const [checkDisabled, setCheckDisabled] = useState(true)
  const intl = useIntl()

  const { run } = useDebounceFn(
    (e: React.MouseEvent) => {
      ;(async () => {
        e.preventDefault()
        const code = inputRef.current?.value as string

        const couponCheckResult = await couponCheck({ plan_id: planID, code })
        if (couponCheckResult === undefined || couponCheckResult.data === undefined) {
          return
        }

        const { type, value, name } = couponCheckResult.data
        onCheckSuccess({ planID, type, value, name, code })
        setLastCheckCode(code)
        setCheckDisabled(true)
      })()
    },
    {
      wait: 500,
    },
  )

  return (
    <>
      <div
        className="block block-link-pop block-rounded block-bordered px-3 py-3 mb-2 text-light"
        style={{ background: 'rgb(53, 56, 61)' }}
      >
        <input
          type="text"
          className="form-control v2board-input-coupon p-0"
          placeholder={intl.formatMessage({ id: 'plan.detail.coupon.enter_coupon' })}
          ref={inputRef}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (checkDisabled === false) {
              return
            }
            const code = e.target.value
            if (code.length > 0 && lastCheckCode !== code) {
              setCheckDisabled(false)
            }
          }}
        />
        <button
          type="button"
          className="btn btn-primary"
          style={{ position: 'absolute', right: 30, top: 17 }}
          onClick={(e: React.MouseEvent) => {
            run(e)
          }}
          disabled={checkDisabled}
        >
          <i className="fa fa-fw fa-ticket-alt mr-2" />
          {intl.formatMessage({ id: 'plan.detail.coupon.check_btn' })}
        </button>
      </div>
    </>
  )
}

export default Coupon
