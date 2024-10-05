export default [
      {
        path: '/shop',
        name: '商城',
        component: () => import(/* webpackChunkName: "shop" */ '@/views/Shop')
      }
]