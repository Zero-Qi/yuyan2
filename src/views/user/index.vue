<template>
  <div id="root">
      <el-container>
          <el-header  class="header">
              <div class="header-content">
                   <div class="headerLeft">
                        <i :class='isFold?"el-icon-s-unfold headerLeft-flot ":"el-icon-s-fold headerLeft-flot"' style="display: block" @click="isToFold()"></i>
                        <div class="headerLeft-title"><span>欢迎进入技术成熟评估管理信息系统</span></div>
                   </div>
                    <div class="headerRight">
                      <ul>
                          <li><span>首页</span></li>
                          <li><img src="~@/assets/img/report.png" alt=""></li>
                          <li><img src="~@/assets/img/message.png" alt=""></li>
                          <li><img src="~@/assets/img/user.png" alt=""  style="height:2rem;width:2rem;"><span style="font-size: 14px;">{{this.$store.state.user.loginUser}}</span></li>
                          <li><img src="~@/assets/img/exit.png" alt=""><span style="font-size: 14px;">退出登录</span></li>
                      </ul>
                    </div>
              </div>
          </el-header>
          <el-container>
              <el-aside :class="isFold?'aside':'aside-none'" style="width:10%">
                <el-col align="left">
                  <div class="aside-menu">
                    <el-menu :default-active="defaultIndex"  @open="handleOpen" @close="handleClose"  @select="handleSelect" 
                      unique-opened router  text-color="#000"
                      style="border:none"
                      active-text-color="#4981B9"
                      background-color="#fff"
                      >
                        <template v-for="(item,index) in NavigationMenu" >
                          <el-menu-item :index="item.index" v-if="item.children.length === 0" :key="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.label}}</span>
                          </el-menu-item>
                          <el-submenu  v-else :index="item.index"  :key="index" style="margin-left:30px;" :class="defaulta==item.index?'icon':''">
                              <template slot="title">
                                <i :class="item.icon" :style="defaultIndex==item.index?'color: #5281B4':'color:#909399'"></i>
                                <span :class="defaulta==item.index?'active':''">{{item.label}}</span>
                              </template>
                              <el-menu-item-group>
                                <el-menu-item class="el-menu-item" v-for="(item1,index1) in item.children" :key="index1" :index="item1.index">{{item1.label}}</el-menu-item>
                              </el-menu-item-group>
                          </el-submenu>
                        </template>
                    </el-menu>
                  </div>
                </el-col> 
              </el-aside>
              <el-main class="main"><router-view/></el-main>
          </el-container>
      </el-container>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        // 是否加边框
        defaulta:window.localStorage.getItem('defaulta'),
        // 是否折叠
        isFold:true,
        // 默认路由
        defaultIndex:this.$route.path,
        // 导航菜单数据
        NavigationMenu:[
          {
            icon:'el-icon-s-home',
            label:'首页',
            index:'/index',
            children:[]
          },
          {
            icon:'el-icon-s-cooperation',
            label:'工程信息管理',
            index:'/projectplan',
            children:[
                {
                label:'计划管理',
                index:'/planMgent'
              },
              {
                label:'课题合同',
                index:'/projectcontract'
              },
              {
                label:'专家管理',
                index:'/technocracy'
              },
              {
                label:'过程文件管理',
                index:'/fileManager'
              }
            ]
          },
          {
            icon:'el-icon-folder-opened',
            label:'技术树管理',
            index:'/management',
            children:[
              {
                label:'技术分解',
                index:'/technologydecompose'
              },
              {
                label:'关键技术管理',
                index:'/technology'
              }
            ]
          },
          {
            icon:'el-icon-basketball',
            label:'技术成熟度评估',
            index:'/k',
            children:[
              {
                label:'开始评估',
                index:'/startAssess'
              },
              {
                label:'评估任务管理',
                index:'/assessManagement'
              },
           
            ]
          },
            {
            icon:'el-icon-folder-opened',
            label:'技术风险评估',
            index:'/riskAssessment',
            children:[
                {
            icon:'el-icon-coordinate',
            label:'开始评估',
            index:'/riskAssessment',
            children:[]
          },
           {
            icon:'el-icon-cpu',
            label:'评估任务管理',
            index:'/riskpg',
            children:[]
          },
            ]
          },
          {
            icon:'el-icon-folder-opened',
            label:'综合数据可视化',
            index:'/managements',
            children:[
                {
            icon:'el-icon-coordinate',
            label:'工程信息看板',
            index:'/engineering',
            children:[]
          },
           {
            icon:'el-icon-cpu',
            label:'评估信息看板',
            index:'/evaluation',
            children:[]
          },
           
            ]
          },
          {
            icon:'el-icon-folder-opened',
            label:'基础信息管理',
            index:'',
            children:[
                {
            icon:'el-icon-coordinate',
            label:'专家管理',
            index:'/zhuanjiaguanli',
            children:[]
          }]
          },
        ]
      }
    },
    created(){

  //  this.$api.axios('dataJson',{},'get').then(res=>{
     
  //  })
    },
    methods:{
      // 是否折叠
      isToFold(){
        this.isFold=!this.isFold
      },
      // 是否打开
      handleOpen(index){
        this.defaultIndex=index
        window.localStorage.setItem('defaulta',index)
        // console.log(this.$refs.submenu)
        this.defaulta=index
      },
      // 是否关闭
      handleClose(index,indexPath){
        this.defaultIndex=index
        window.localStorage.removeItem('defaulta')
        this.defaulta=index
      },
      // 当前用户选择项
      handleSelect(keyPath){
        this.NavigationMenu.forEach(item=>{
          if(keyPath==item.index){
            window.localStorage.removeItem('defaulta')
            this.defaulta=''
          }
        })
        this.defaultIndex=keyPath
      }
    }
  }
</script>

<style lang="less" scoped>
.header{
  height: 8vh !important;
  background: #2b69a6;
}
.header-content{
  display: flex;
  align-items: center !important;
  justify-content: space-between;
  height: 100%;
}
.headerLeft{
  display: flex;
  // justify-content: center;
  align-items: center;
}

.headerLeft-flot{
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}
.headerLeft-flot img{
  width: 100%;
  height: 100%;
}

.headerLeft-title{
  color: #fff;
  font-size: 1.0714rem;
  margin-left:0.8571rem;
}
.headerRight{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.headerRight ul{
 list-style-type:none;
 text-align: center;
 display: flex;
  align-items: center;
}
.headerRight ul li span{
  color: #fff;
  font-size: 1.0714rem;
  padding-left: 0.5714rem;
}
.headerRight ul li img{
  width: 1.3rem;
  height: 1.3rem;
  cursor: pointer;
}
.headerRight li{
  display: flex;
  align-items: center;
  padding-left: 1.9286rem;
}
.el-menu-item{
  margin-left: 30px;
}
.el-menu-item:hover{
  background: #fff !important;
  color: #4981B9 !important;
}
.aside{
  border-right:2px solid #fff;
  height: 93vh;
  background: #fff;
  box-shadow: #cccccc 10px 10px 30px 5px ;//边框阴影
  width: 13.6429rem !important;
}
.aside-menu{
  height: 100%;
  background: #fff;
  padding-top: 19px;
}
.aside-none{
  width: 0px !important;
}
.main{
  background:#EDEEF4;
  padding: 0;
  height: 93vh;
  margin: 0 1rem;
}
.active{
  border-bottom: 0.1429rem solid #5281B4;
  color: #5281B4;
  padding-bottom: 0.1429rem;
}
</style>