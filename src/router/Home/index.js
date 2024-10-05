export default [
      {
        path: '/home',
        name: '首页',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
      }
]