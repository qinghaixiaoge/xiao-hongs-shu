export default [
      {
        path: '/my',
        name: '我',
        component: () => import(/* webpackChunkName: "my" */ '@/views/My')
      }
]