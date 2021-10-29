import { defineConfig } from 'umi'
import chainWebpack from './webpack'
const isProduction = process.env.NODE_ENV === 'production'
const isStandAlone = process.env.STANDALONE !== undefined
console.log('isProduction:', isProduction)
console.log('isStandalone:', isStandAlone)

export default defineConfig({
  hash: false,
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  targets: {
    ie: 11,
  },
  title: false,
  ignoreMomentLocale: true,
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: false,
    baseSeparator: '-',
  },
  manifest: {
    basePath: '/',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  chainWebpack: isProduction ? chainWebpack : undefined,
  chunks: isProduction ? ['vendors', 'compoments', 'umi'] : undefined,
  headScripts: isProduction
    ? isStandAlone
      ? [
          {
            src: '/env.js',
          },
          {
            content:
              'if(window.settings !== undefined && window.settings.crisp_id !== undefined){window.$crisp=[];window.CRISP_WEBSITE_ID=window.settings.crisp_id;(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();}',
          },
        ]
      : [
          {
            content:
              'if(window.settings !== undefined && window.settings.crisp_id !== undefined){window.$crisp=[];window.CRISP_WEBSITE_ID=window.settings.crisp_id;(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();}',
          },
        ]
    : undefined,
  define: {
    'process.env.STANDALONE': process.env.STANDALONE,
    'process.env.VERSION': '1.2.1',
    'process.env.CURRENCY_LOCALE': process.env.CURRENCY_LOCALE ?? 'zh-CN',
    'process.env.CURRENCY_UNIT': process.env.CURRENCY_UNIT ?? 'CNY',
  },
})
