import fs from 'fs'
import path from 'path'

import Koa from 'koa'
import Router from '@koa/router'
import staticServe from 'koa-static'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

import routerConfig from '../shared/Router'
import { createServerStore } from '../shared/store'
import App from '../shared/App'

const app = new Koa()
const router = new Router()

const fileResolve = (file) => path.resolve(__dirname, file)
console.log('__dirname', process.cwd())
function templating(template) {
  return props => template.replace(/<!--(\s\S)*?-->/, (_, key) => props[key.toString().trim()])
}

router.get(['/', '/about'], async (ctx, next) => {
  const template = fs.readFileSync(fileResolve('index.html'), 'utf8')
  const render = templating(template)
  const store = createServerStore()
  const promises = []
  routerConfig.some(route => {
    const match = matchPath(ctx.request.path, route.path)
    console.log('match', match, ctx.request.path, route.path);
    if (match && route.loadData) {
      promises.push(route.loadData(store))
    }

    return match
  })
  console.log('promises', promises);

  await Promise.all(promises).then(res => {
    console.log('server data: ', res);

  })

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  ctx.body = render({
    injectdom: html,
    injectstore: `<script>window.REDUX_STORE = ${JSON.stringify(store.getState())}</script>`
  })
  // ctx.body = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //   <head>
  //     <meta charset="UTF-8">
  //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <title>测试页面</title>
  //   </head>
  //   <body>
  //     <script>window.REDUX_STORE = ${JSON.stringify(store.getState())}</script>
  //     <h1>测试页面</h1>
  //     <div id="root">${html}</div>
  //     <script src="bundle.js"></script>
  //   </body>
  //   </html>
  // `
})

router.get('/getData', ctx => {
  ctx.body = {
    code: 0,
    message: 'success',
    data: [
      { id: 1, name: 'hello' },
      { id: 2, name: 'world' },
    ]
  }
})

app.use(staticServe('assets'))
app.use(router.routes()).use(router.allowedMethods())

app.listen(3200, () => {
  console.log('server is running at http://localhost:3200 ');
})