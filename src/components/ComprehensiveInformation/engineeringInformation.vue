<template>
  <div class="main">
    <el-row style="margin-bottom: 0px; margin-top: 20px">
      <el-col :span="6" offset="6">
        <span>计划完成情况</span>
      </el-col>
      <el-col :span="6" offset="6"> 计划完成事 </el-col>
    </el-row>
    <el-row >
      <el-col :span="6" offset="1">
        <div class="white" style="padding-top: 20px"><biaoqian /></div>
      </el-col>
      <el-col :span="6">
        <div class="white" style="padding-top: 20px"><biaoqian1 /></div>
      </el-col>
      <el-col :span="1"><el-divider direction="vertical"></el-divider></el-col>

      <el-col :span="10"
        ><div class="white"><yuanzhu :width="width" :height="height" /></div
      ></el-col>
    </el-row>

    <el-row style="height: 200px">
      <el-col :span="11" offset="1">
        <div id="parent1">
          <yuanzhu :width="width" :height="height" :mc="mc" />
        </div>
      </el-col>
      <el-col :span="1" offset="1">
        <div class="black"></div>
      </el-col>
      <el-col :span="10"
        ><div id="d22">
          <yuanzhu :width="width" :height="height" :mc="mc1" /></div
      ></el-col>
    </el-row>
    <el-row style="height: 280px">
      <el-col :span="9" offset="2">
        <div id="parent3" style="margin-top: 5px">
          <shanxingtu :myChart="shanxingtu1" :width="shanwidth" :height="height" :type="type"/>
        </div>
      </el-col>
      <el-col :span="2" offset="2">
        <div style="margin-top: 5px">
          <el-divider direction="vertical"></el-divider>
        </div>
      </el-col>
      <el-col :span="8" offset="1"
        ><div style="margin-top: 5px">
          <shanxingtu :myChart="shanxingtu2" :width="shanwidth" :height="height" /></div
      ></el-col>
    </el-row>
  
  </div>
</template>

<script>
import biaoqian from "./com/biaoqian.vue";
import biaoqian1 from "./com/biaoqian1.vue";
import yuanzhu from "./com/yuanzhu.vue";
import shanxingtu from "./com/shanxingtu.vue";

export default {
  components: {
    biaoqian,
    biaoqian1,
    yuanzhu,
    shanxingtu,
  },
  data() {
    return {
      width: "320px",
      height: "200px",
      mc: "mainyuan5",
      mc1: "mainyuan6",
      shanxingtu1: "shangxingtu1",
      shanxingtu2: "shangxingtu2",
      type: 'circle',
      shanwidth: "400px"
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
  background-color: #fff;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-divider--vertical {
  height: 150px;
}
.white {
  height: 190px;
  background-color: #fff;
}
.black{
  background-color: #E8E9F1;
  width: 10px;
  height: 200px;
}
</style>
