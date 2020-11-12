import {getUserTempId} from '@/utils/userAbout'
import {reqUserLogin, reqUserRegister,reqUserLogout} from '@/api'
const state = {
  userTempId:getUserTempId(),
  //第一版本 不但包含了token还包含了用户的其他信息（nickName,name）
  // userInfo:{} //不考虑自定登录
  userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY')) ||{} //考虑自动登录
}
const mutations = {
  RECEIVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  REMOVEUSERINFO(state){
    state.userInfo ={}
  }
  
}
const actions = {
  async userRegister({commit},userInfo){
    const result = await reqUserRegister(userInfo)
      if(result.code === 200){
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    async userLogin({commit},userInfo){
      const result = await reqUserLogin(userInfo)
      if(result.code === 200){
        commit('RECEIVEUSERINFO',result.data)
        //存储到localStorage当中是为了作自动登录
        localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data)) ||{}
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
      }
    },
    async userLogout({commit}){
      const result = await reqUserLogout()
      if(result.code === 200){//一旦请求退出登录成功，需要删除state当中userInfo当中的数据，并且还要删除localStorage当中的用户信息
        commit('REMOVEUSERINFO')
        localStorage.removeItem('USERINFO_KEY')
        return 'ok'
      }else{
        return Promise.reject(new Error('fail'))
      }

      
    }
  }

const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}