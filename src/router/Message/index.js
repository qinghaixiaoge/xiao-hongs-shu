export default [
    {
        path: "/message",
        name: "消息",
        component: () => import(/* webpackChunkName: "message" */ '@/views/Message')
    }
]