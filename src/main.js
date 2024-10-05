import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/utils/setFontSize"
import "@/styles/iconfont.scss"
import "@/styles/main.scss"

createApp(App).use(store).use(router).mount('#app')
