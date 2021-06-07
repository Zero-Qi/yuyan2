import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user'
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    // 设置登陆状态
    loginUser: null,
    token: null,
  },
  modules: {
      user
  },
  getters: {
    getLoginState(state) {
        return state.loginUser ? state.loginUser.UserName : '未登录'
    }
}
});

export default store;