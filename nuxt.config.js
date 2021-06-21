module.exports = {
  router: {
    //自定义路由规则
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除默认的路由规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layouts/'),
          children: [
            {
              path: '',//默认
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            }, {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            }, {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            }, {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            }, {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings')
            }, {
              path: '/editor/:slug?',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor')
            }, {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article')
            }
          ]
        }
      ])
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3030
  },
  plugins: [
    '~/plugins/dayjs.js',
    '~/plugins/request.js'
  ]
}