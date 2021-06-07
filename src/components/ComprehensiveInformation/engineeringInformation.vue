<template>
  <div id="container">
    <p>法一：</p>
    <div class="imgbox">
      <img src="img1.png" />
      <lable>空山新雨后，天气晚来秋</lable>
    </div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
#container .imgbox{
        height: 216px;
        width: 384px;
    }
#container img {
        position: absolute;/*设为绝对定位*/
        opacity: 0.7;/*设置透明度*/
    }
#container lable {
        width: inherit;
        text-align: right;
        font-size: 20px;
        color: ivory;
        position: absolute;/*设为绝对定位*/
    }
</style>
