<template>
  <div class="div1">
    <img src="~@/assets/img/img1.png" alt="" />
    <div class="div2">已完成计划</div>
     <div class="div3"><span>32</span><span>项</span><span class="mm">占比:</span><span>16%</span></div>
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
img{
  width: 16.666667rem;
  height: 8.333333rem;
}
.div1 {

  position: relative;
  width: 100px;
  height: 100px;
}
.div2 {
  width: 200px;
  position: absolute;
  z-index: 2;
  left: 2.833333rem;
  top: 1rem;
  color: #fff;
}
.div3 {
  color: #fff;
  width: 200px;
  position: absolute;
  z-index: 2;
  left: 2.5rem;
  top: 3.5rem;
}
.mm{
  padding-left: 50px;
}
</style>
