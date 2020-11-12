// import Home from '@/views/Home'
//路由懒加载
const Home =()=> import('@/views/Home')
// import Search from '@/views/Search'
const Search = ()=> import('@/views/Search')
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade' //创建订单页面
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'  //用户中心
import GroupOrder from '@/views/Center/GroupOrder';
import MyOrder from '@/views/Center/MyOrder';
import store from '@/store'
export default [
  {
    path: '/center',
    component: Center,
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '',
        redirect: 'myorder'
      }
    ]
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if(from.path === '/pay'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if(from.path === '/trade'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    beforeEnter: (to, from, next) => {
      if(from.path === '/shopcart'){
        next()
      }else{
        next('/')
      }
    }
  },
  {
    path: '/shopcart',
    component: ShopCart
  },
  {
    path: '/addcartsuccess',
    component: AddCartSuccess,
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if (skuInfo && skuNum) {
        next()
      } else {
        next('/')
      }

    }
  },
  {
    path: '/detail/:skuId',
    component: Detail
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/search/:keyword?',
    component: Search,
    name: 'search',
    // props: (route)=>({keyword:route.params.keyword, keyword1: route.query.keyword1 })
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isHidden: true
    },
    //   //路由独享守卫
    //   beforeEnter: (to, from, next) => {
    //     if(store.state.users.userInfo.name){
    //       next('/')
    //     }else{
    //       next()
    //     }
    //   }
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isHidden: true
    }
  },
  {
    path: '/',
    redirect: '/home'
  }
]