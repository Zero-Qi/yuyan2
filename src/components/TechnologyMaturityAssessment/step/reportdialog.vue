<template>
  <el-dialog
    customClass="customWidth"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
    :show-close="false"
  >

 <el-col :span="24" :offset="12"><span>成熟度统计分析</span></el-col>
  <el-row >
  <el-col :span="18"><div id="m1"><maturityStatistics /></div></el-col>
  <el-col :span="6"><div id="m3"><shan /> </div><div id="m2"><yuanzhu/></div></el-col>
</el-row>
 <el-col :span="24" :offset="12">  <div id="end"><el-button size='mini' @click="close">返回</el-button></div>
</el-col>

  </el-dialog>
</template>
 
<script>
import maturityStatistics from "components/ComprehensiveInformation/com/maturityStatistics.vue";
import shan from "components/ComprehensiveInformation/com/shan.vue";
import yuanzhu from "components/ComprehensiveInformation/com/yuanzhu.vue";
export default {
  components: {
    maturityStatistics,
    shan,
    yuanzhu
  },
  data() {
    return {
      multipleSelection: [],
      visible: this.show,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  methods: {
   
    close() {
      this.$emit("close");
    },
    ok() {
      this.$emit("ok", this.multipleSelection);
      this.getgjjsglb();
    },
  },
  mounted() {
  },
};
</script>
 <style scoped>
#m1{
  margin-top: 3rem;
}
#m2{
  margin-top: -5.5rem;
}
#m3{
  margin-top: -2rem;
  }
  #end{
    margin-top: 0rem;
  }
</style>
