//这个文件是所有的接口请求函数
//每个接口我们以后都要使用axios去发送请求获取数据
//在这个文件当中我们把每个接口发请求都封装一个函数，以后哪里需要接口的数据，就调用相关的那个接口请求函数就好了
import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'
// /api/product/getBaseCategoryList
// 请求方式  get
// 参数  无

export const reqCategoryList = () => {
  return Ajax({
    url:'/product/getBaseCategoryList',
    method:'get'
  })
}


// reqCategoryList()

//mock的接口

export const reqBannerList = () => {
  return mockAjax({
    url:'/banner',
    method:'get'
  })
}

export const reqFloorList = () => {
  return mockAjax({
    url:'/floor',
    method:'get'
  })
}



// /api/list
export const reqGoodsListInfo = (searchParams) => {
  return Ajax({
    url:'/list',
    method:'post',
    data:searchParams
  })
}

// reqGoodsListInfo({})


// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }


// 获取商品详情数据 
// /api/item/{ skuId }
export const reqGoodsDetailInfo = (skuId) => {
  return Ajax({
    url:`/item/${ skuId }`,
    method:'get'
  })
}


//请求添加购物车（添加或者修改购物车数量）
// /api/cart/addToCart/{ skuId }/{ skuNum }
//post

export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
  return Ajax({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:'post'
  })
}


//请求购物车列表数据
// /api/cart/cartList
//get

export const reqShopCartList = () => {
  return Ajax({
    url:'/cart/cartList',
    method:'get'
  })
}

//请求修改购物车选中状态
// /api/cart/checkCart/{skuId}/{isChecked}
//get

export const reqUpdateCartIsCheck = (skuId,isChecked) => {
  return Ajax({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
  })
}


//请求删除购物车单个的
// /api/cart/deleteCart/{skuId}
// delete

export const reqDeleteCart = (skuId) => {
  return Ajax({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })
}
// 请求注册用户
// /api/user/passport/register
// post
export const reqUserRegister = (userInfo)=>{
  return Ajax({
    url:'/user/passport/register',
    method:'post',
    data:userInfo
  })
}
// 请求用户登录
// /api/user/passport/login   post
export const reqUserLogin =(userInfo)=>{
  return Ajax({
    url:'/user/passport/login',
    method:'post',
    data:userInfo
  })
}
//请求退出登录

///api/user/passport/logout

//get
export const reqUserLogout=()=>{
  return Ajax({
    url:'/user/passport/logout',
    method:'get'
  })
}
//请求获取订单交易信息
// /api/order/auth/trade   get
export const reqTradeInfo = ()=>{
  return Ajax({
    url:'/order/auth/trade',
    method:'get'
  })
}
// 请求创建订单（点击提交按钮就会）
// /api/order/auth/submitOrder?tradeNo={tradeNo}
// POST
// 参数  交易编号是query  其余是请求体data
export const reqSubmitOrder = (tradeNo,tradeInfo) =>{
  return Ajax({
    url:`/order/auth/submitOrder`,
    method:'post',
    //里面用来写query参数
    params:{
      tradeNo
    },
    data:tradeInfo
  })
}
// /api/payment/weixin/createNative/{orderId}
// get
export const reqOrderInfo =(orderId)=>{
  return Ajax({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}
// 请求查询订单的支付状态
///api/payment/weixin/queryPayStatus/{orderId}
// get
export const reqPayStatus = (orderId) => {
  return Ajax({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}

//请求获取我的订单数据
///api/order/auth/{page}/{limit}
//get
export const reqMyOrderInfo = (page,limit)=>{
  return Ajax({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}
