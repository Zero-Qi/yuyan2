<template>
  <div id="myChart2" :style="{ width: '18rem', height: '200px' }"></div>
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
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      let index = 0;
      var img =
        "data:image/png;base64,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";

      var colorList = [
        '#89DBE6',
        "#2878CA",
      ];

      myChart2.setOption({
        title: {
          text: "",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 20,
          },
        },
        graphic: {
          elements: [
            {
              type: "image",
              z: 3,
              style: {
                image: img,
                width: 50,
                height: 50,
              },
              left: "center",
              top: "center",
              position: [100, 100],
            },
          ],
        },
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["24%", "40%"],
            clockwise: true,
            avoidLabelOverlap: true,
            hoverOffset: 15,
            itemStyle: {
              normal: {
                color: function (params) {
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              position: "outside",
              formatter: "{b|{b}}\n{a|{d}%}\n{hr|}",
              rich: {
                hr: {
                  backgroundColor: "t",
                  width: 3,
                  height: 3,
                  borderRadius: 3,
                  padding: [3, 3, 0, -12],
                },
                a: {
                  align: "center",
                  padding: [-20, 10, 0, 10],
                  height: 20,
                },
                b: {
                  padding: [-20, 10, -30, 10],
                },
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 30,
                lineStyle: {
                  width: 1,
                },
              },
            },
            data: [
              {
                name: "北京",
                value: 5600,
              },
              {
                name: "上海",
                value: 3600,
              },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style>
</style>
