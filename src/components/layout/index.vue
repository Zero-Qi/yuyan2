<template>
  <div>
    <el-container>
      <el-header>
        <i
          style="float: left; font-size: 25px; padding-top: 18px"
          @click="shensuo()"
          :class="{ 'el-icon-s-fold': isA, 'el-icon-s-unfold': !isA }"
        ></i>
        <span style="float: left; padding-left: 10px"
          >xxx项目技术风险评价与管理系统</span
        >
        <span style="float: right; padding-right: 30px">退出登录</span>
        <i
          style="float: right; padding-right: 30px; font-size: 20px;padding-top: 18px"
          class="el-icon-s-custom"
        > <span style="font:16px 'PingFang SC'">欢迎您，刘丽华</span></i>
       

        <i
          style="float: right; padding-right: 30px; font-size: 20px;padding-top: 18px"
          class="el-icon-close-notification"
        ></i>
        <i
          style="float: right; padding-right: 30px; font-size: 20px;padding-top: 18px"
          class="el-icon-chat-dot-square"
        ></i>
        <span style="float: right; padding-right: 30px">首页</span>
      </el-header>
      <el-container>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span slot="title">首页</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-set-up"></i>
              <span slot="title">工程信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">计划管理</el-menu-item>
              <el-menu-item index="2-2">课题合同</el-menu-item>
              <el-menu-item index="2-3">专家管理</el-menu-item>
              <el-menu-item index="2-4">过程文件管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-baseball"></i>
              <span slot="title">技术树管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">技术分解</el-menu-item>
              <el-menu-item index="3-2">关键技术管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">技术成熟度评估</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">开始评估</el-menu-item>
              <el-menu-item index="4-2">评估任务管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">技术成熟度评估</span>
          </el-menu-item>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span slot="title">综合数据可视化</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="6-1">综合数据看板</el-menu-item>
              <el-menu-item index="6-2">工程信息看板</el-menu-item>
              <el-menu-item index="6-3">技术成熟度看板</el-menu-item>
              <el-menu-item index="6-4">技术风险看板</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span slot="title">基础信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="7-1">专家管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>

        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isCollapse: false,
      isA: true,
    };
  },
  methods: {
    shensuo() {
      this.isCollapse = !this.isCollapse;
      this.isA = !this.isA;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  margin: 0;
  padding: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header {
  background-color: #10549b;
  color: #fff;
  text-align: center;
  line-height: 60px;
  width: 100%;
}

.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
