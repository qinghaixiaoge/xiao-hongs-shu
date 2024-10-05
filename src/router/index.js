import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
/* let routes = [];
// 是webpack特有的，适用于动态加载模块，动态生成路由配置，无需手动声明每个路由文件
const getModule = require.context("./",true,/index\.js$/);
// 传入模块id，返回对应的导出内容
// console.log(getModule); 
getModule.keys().forEach(moduleId => {
  // 得到模块id【模块路径】
  // console.log(moduleId);
  // 得到模块id对应的导出内容【模块导出内容】
  // console.log(getModule(moduleId));
  if (moduleId.startsWith("./index")) return
  const content = getModule(moduleId)
  routes = [...routes,...(content.default || content)]
}); */

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
export {
  routes
}
