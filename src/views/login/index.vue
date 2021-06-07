<template>
  <div id="login">
    <el-col>
      <div class="content">
        <el-col :span="16">
        <div class="leftImg">
          <img src="~@/assets/img/index.png" alt="" srcset="">
        </div>
        </el-col>
        <el-col :span="8">
          <div class="rightLogin">
            <div class="rightLogin-img"></div>
            <div class="rightLogin-title">XX项目技术风险评价与管理技术</div>
            <div class="rightLogin-subTitle">账号密码登录</div>
            <el-col :span="17">
              <div class="rightLogin-form">
                  <el-form ref="form" :model="form">
                      <el-form-item>
                        <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" type="password"></el-input>
                      </el-form-item>
                  </el-form>
              </div>
            </el-col>
            <el-col :span="17">
                <div class="rightLogin-button">
                  <el-button class="rightLogin-button-login" @click="sureLogin()" >确定</el-button>
                </div>
            </el-col>
          </div>
        </el-col>
      </div>
  </el-col>
  </div>
</template>

<script>
import {login} from 'api/login'
import { Message } from 'element-ui'

  export default {
     data(){
       return {
         // 登录表单
         form:{
           username:'',
           password:'',
         }
       }
     },
     methods:{
       sureLogin(){
         let _data = {
        username: this.form.username,
        password: this.form.password
      }
       this.$store.dispatch('Login', _data).then(() => {
           this.$router.push({
               path: '/index'
           }); //登录成功之后重定向到首页
           console.log('跳转完毕');
       }).catch(() => {
           this.loading = false
       })
      }
     }
  }
</script>

<style lang="less" scoped>
#login{
  height: 100vh;
  background: #fff;
}
.content{
  // background: #000;
  margin-top: 1.5vh;
  margin-left: 1.5vh;
    margin-right: 1.5vh;
}
.leftImg{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 97vh;
}
.leftImg img{
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
}
.rightLogin{
  // background: #000;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.rightLogin-img{
  width: 3.5714rem;
  height: 3.5714rem;
  background: #6dc6ff;
  margin-bottom: 1.5714rem;
  border-radius: 0.8571rem;
}
.form-img{
  width: 100%;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.form-img img{
  width: 70%;
  height: 100%;
}
.rightLogin-title{
  font-size: 1.5rem;
  font-weight: bold;
  font-family: '微软雅黑';
  color:#000;
  padding-bottom: 1.5714rem;
}
.rightLogin-subTitle{
  color: #4383B3;
  border-bottom: 3px solid #255ba5;
  padding-bottom: 0.5714rem;
  font-family: "微软雅黑";
  font-weight: 500;
}
.rightLogin-form{
  padding-top: 0.7143rem;
  padding-bottom: 2.4286rem;
}
.rightLogin-button-login{
  background: #2B69A6;
  width: 100%;
  color: #fff;
}
</style>