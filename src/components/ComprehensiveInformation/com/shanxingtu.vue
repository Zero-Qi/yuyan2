<template>
  <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
</template>

<script>
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
      let index = 0;

      var colorList = ['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF']

      myChart.setOption({
            title: {
        text: 'pieChart',
        x: 'center',
        y: 'center',
        textStyle: {
            fontSize: 20
        }
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [{
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['24%', '45%'],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 15,
        itemStyle: {
            normal: {
                color: function(params) {
                    return colorList[params.dataIndex]
                }
            }
        },
        label: {
            show: true,
            position: 'outside',
            formatter: '{b|{b}}\n{a|{d}%}\n{hr|}',
            rich: {
                hr: {
                    backgroundColor: 't',
                    width: 3,
                    height: 3,
                    borderRadius: 3,
                    padding: [3,3,0,-12]
                },
                a: {
                    align: 'center',
                    padding: [-20,10,0,10],
                    height: 20
                },
                b: {
                    padding: [-20,10,-30,10]
                }
            }
        },
        labelLine: {
            normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                    width: 1
                }
            }
        },
        data: [{
            'name': '北京',
            'value': 5600
        }, {
            'name': '上海',
            'value': 3600
        }, {
            'name': '广州',
            'value': 1500
        }, {
            'name': '深圳',
            'value': 2000
        }, {
            'name': '未知',
            'value': 899
        }, {
            'name': '海外',
            'value': 4000
        }],
    }]
      });
    },
  },
};
</script>

<style>
</style>
