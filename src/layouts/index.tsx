import './style.less'
import type { FC } from 'react'
import type { IRouteComponentProps } from 'umi'
import {
  title,
  version,
  sidebarTheme,
  headerTheme,
  colorTheme,
  isNoLaooutPath,
  isStandAlone,
  isProduction,
} from '@/default'
import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import classNames from 'classnames/bind'
import zhCN from 'antd/es/locale/zh_CN'
import viVN from 'antd/es/locale/vi_VN'
import enUS from 'antd/es/locale/en_US'
import { getLocale } from 'umi'
import { ConfigProvider } from 'antd'
import { useDarkreader } from 'react-darkreader'
import { useTitle, useExternal } from 'ahooks'

const LayoutPage: FC<IRouteComponentProps> = (props) => {
  const [sideOpen, setSideOpen] = useState(false)
  const { children, location } = props
  const darkMode = localStorage.getItem('dark-mode') === '1'

  useDarkreader(darkMode, undefined, {ignoreInlineStyle:["path"], invert:[], ignoreImageAnalysis:[], 
  css:"background-color: ${white} !important;"})

  const containerClassNames = classNames(
    'sidebar-o',
    'side-scroll',
    'page-header-fixed',
    'page-footer-fixed',
    'main-content-boxed',
    'side-trans-enabled',
    {
      'sidebar-o-xs': sideOpen,
      'page-header-dark': headerTheme === 'dark',
      'sidebar-dark': sidebarTheme === 'dark',
    },
  )

  let themePath: string
  if (isStandAlone || isProduction === false) {
    themePath = `./theme/${colorTheme}.css`
  } else {
    themePath = `/theme/v2board/assets/theme/${colorTheme}.css`
  }

  useExternal(themePath, { async: false, type: 'css' })
  useTitle(title)
  if (isNoLaooutPath(location.pathname)) {
    return <>{children}</>
  }

  const sideOpenHandler = () => {
    setSideOpen(true)
  }

  const sideCloseHandler = () => {
    setSideOpen(false)
  }

  let locale = zhCN
  if (getLocale() === 'en-US') {
    locale = enUS
  } else if (getLocale() === 'vi-VN') {
    locale = viVN
  }

  return (
    <>
      <ConfigProvider locale={locale}>
        <div id="page-container" className={containerClassNames}>
          <div
            className="v2board-nav-mask"
            onClick={sideCloseHandler}
            style={{ display: sideOpen ? 'block' : 'none' }}
          ></div>
          <Sidebar onSideClose={sideCloseHandler}></Sidebar>

          <Header onSideOpen={sideOpenHandler}></Header>

          <main id="main-container">{children}</main>

          <Footer name={title} version={version}></Footer>
        </div>
      </ConfigProvider>
    </>
  )
}

export default LayoutPage
