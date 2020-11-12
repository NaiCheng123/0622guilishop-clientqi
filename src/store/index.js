import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const getters = {}

import home from './home'
import users from './users'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import trade from './trade'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  //合并每个模块小的store到大的store 使用这个核心概念
  modules:{
    home,
    users,
    search,
    detail,
    shopcart,
    trade
  }
})