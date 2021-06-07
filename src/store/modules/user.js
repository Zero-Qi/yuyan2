import {login} from 'api/login'
const user = {
    state: {
      token: '',
      roles: null,
      isMasterAccount:true,
      loginUser: null
    },
  
    mutations: {
    //   SET_TOKEN: (state, token) => {
    //     state.token ="Bearer " +token 
    //   },
      settoken(state, info){
            state.loginUser = info.username
            localStorage.setItem('token',info.token)
            console.log(state.loginUser);
      }
    },
    actions: {
      // 登录
      Login({
        commit
      }, userInfo) {
        return new Promise((resolve, reject) => {
          login(userInfo).then(x => {
              console.log(userInfo,x);
            let data ={
                username : userInfo.username,
                token : x.data.result.token
            }
            commit('settoken', data)
            console.log('okk');
            resolve();

          }).catch(error => {
            console.log("登录失败")
            reject(error)
          })
        })
      },
    },
    getters:{
        
    }
  }
  
  export default user