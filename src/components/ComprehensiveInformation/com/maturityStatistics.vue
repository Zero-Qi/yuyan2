<template>
  <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
</template>

<script>
import axios from 'axios';
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
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
          left: "20px",
          textStyle: {
            color: "#436EEE",
            fontSize: 17,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          itemWidth: 15,
          itemHeight: 15,
          data: ["初始TRL", "中期TRL提升值",'目标TRL差距值'],
        },
        xAxis: {
          data: ["技术一", "技术一", "技术一", "技术一", "技术一", "技术一"],
          splitLine: {
            show: false,
          },
          grid: {
            left: "10%",
            bottom: "35%",
          },
          axisLabel: {
            interval: 0,
            rotate: -40,
          },
          axisLine:{
            symbol : 'none'
          },
          axisTick:{
            show : false
          }
        },
        yAxis: {
          splitLine: {
            show: true,
             lineStyle: {
                    color: ['#6E7D9C'],
                    width: 1,
                    type: 'solid',
                    opacity: 0.5
                    
                }
          },
        },
        series: [
          {
            name: "初始TRL",
            type: "bar",
            stack: "使用情况",
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              normal: { color: "#2878CA", barBorderRadius: [0, 0, 0, 0] },
            },
            barMaxWidth: '40%'
          },
          {
            name: "中期TRL提升值",
            type: "bar",
            stack: "使用情况",
            data: [40, 22, 18, 35, 42, 40],
            itemStyle: {
              normal: { color: "#3EBCE8" ,barBorderRadius: [30,30,0,0]},
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
