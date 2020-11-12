import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const originPush = VueRouter.prototype.push  //先把原来的push函数保存一份
const originReplace = VueRouter.prototype.replace  //先把原来的replace函数保存一份

//修改路由器原型当中的push为我们自己定义的push
//而我们自己定义的push并没有原来push的功能，我们最终还是使用原来的push功能
//我们只是在原来的功能基础之上加了个判断
VueRouter.prototype.push = function (location, resolved, rejected) {
  if (resolved === undefined && rejected === undefined) {
    return originPush.call(this, location).catch(() => { })
  } else {
    return originPush.call(this, location, resolved, rejected)
  }
}

VueRouter.prototype.replace = function (location, resolved, rejected) {
  if (resolved === undefined && rejected === undefined) {
    return originReplace.call(this, location).catch(() => { })
  } else {
    return originReplace.call(this, location, resolved, rejected)
  }
}




import routes from './routes'
const router = new VueRouter({
  mode: 'history',
  routes,
  //切换路由的时候保证跳转到的页面滚动位置在最上方
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
//路由全局前置守卫
router.beforeEach((to, from, next) => {
  let targetPath = to.path
  if (targetPath.indexOf('/pay') === 0 || targetPath.startsWith('/trade') || targetPath.startsWith('/center')) {
    if (store.state.users.userInfo.name) {
      next()
    } else {
      alert('请先登录')
      next('/login?redirect='+targetPath)
    }
  } else {
    next()
  }
})
export default router

