<template>
  <div id="myChart3" :style="{ width: '250px', height: '270px' }"></div>
</template>

<script>
import axios from "axios";
export default {
  name: "hello",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  mounted() {
    this.drawLine(); // 初始化
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      // 绘制图表
      myChart3.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },

        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "40%",
            data: [10, 52, 200],
             itemStyle: {
              normal: { 
                  color: (params) => {
					let colors = ['#2878CA', '#3EBCE8', '#89DBE6']
					return colors[params.dataIndex]
				},
                  
                  barBorderRadius: [10, 10, 10, 10] },
            },
          },
          
        ],
      });
    },
  },
};
</script>

<style>
</style>
