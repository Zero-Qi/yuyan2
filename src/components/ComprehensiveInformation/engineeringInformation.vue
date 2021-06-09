<template>
  <div class="main">
    <div id="d1">
      <el-row>
        <el-col :span="6" offset="6">
          <span>计划完成情况</span>
        </el-col>
        <el-col :span="6" offset="6"> 计划完成事 </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div id="parent">
            <div id="d11"><biaoqian /></div>
            <div id="d112"><biaoqian1 /></div>
          </div>
        </el-col>
        <el-col :span="10" offset="2"
          ><div id="d12"><yuanzhu :width="width" :height="height"/></div
        ></el-col>
      </el-row>
    </div>
    <div id="d2"></div>

    <div id="d3"></div>
  </div>
</template>

<script>
import biaoqian from "./com/biaoqian.vue";
import biaoqian1 from "./com/biaoqian1.vue";
import Yuanzhu from "./com/yuanzhu.vue";
export default {
  components: {
    biaoqian,
    biaoqian1,
    Yuanzhu,
  },
  data() {
    return {
      width: "320px",
      height: "240px",
    };
  },
  methods: {},
};
</script>

<style scoped>
#d1 {
  height: 25%;
  background-color: #fff;
  margin-top: 1.833333rem;
  padding-top: 1rem;
}
#parent {
  display: flex;
}
#d11 {
  flex: 1;
}
#d112 {
  flex: 1;
}
#d12{
  margin-top: -3rem;
}
</style>
