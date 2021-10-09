import type { FC } from 'react'
import { Dropdown, Menu } from 'antd'
import { useDarkreader } from 'react-darkreader'

const DropDownDark: FC = () => {
  const darkMode = localStorage.getItem('dark-mode') === '1' ? true : false
  const [isDark, { toggle }] = useDarkreader(darkMode)

  const menu = () => (
    <>
      <Menu
        style={{
          boxShadow: '0 .25rem 2rem rgba(0,0,0,.08)',
          borderColor: '#ebebeb',
        }}
      />
    </>
  )

  return (
    <>
      <Dropdown overlay={menu}>
        <button
          type="button"
          className="btn btn-default mr-1"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault()
            toggle()
            localStorage.setItem('dark-mode', isDark ? '0' : '1')
          }}
        >
          {isDark === false && <i className="far fa fa-sun" />}
          {isDark === true && <i className="far fa fa-moon" />}
        </button>
      </Dropdown>
    </>
  )
}

export default DropDownDark
