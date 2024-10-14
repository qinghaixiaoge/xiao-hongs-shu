const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('@/views/Home')
    },
    {
        path: '/shop',
        name: '商城',
        component: () => import('@/views/Shop')
    },
    {
        path: '/publish',
        name: '',
        component: () => import('@/views/Publish')
    },
    {
        path: '/message',
        name: '消息',
        component: () => import('@/views/Message')
    },
    {
        path: '/my',
        name: '我',
        aaa: "333",
        meta:{
            auto: true
        },
        component: () => import('@/views/My')
    }
]

export default routes