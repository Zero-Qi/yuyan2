<template>
  <div id="riskAssessment">
    <div class="information">
      <div class="informationTop">
        <span><i class="el-icon-document"></i>基本信息</span>
      </div>
      <div class="mian" id="main">
        <el-row :gutter="200">
          <el-col :span="12"><span>关键技术名称：{{information.jishumingchneg}}</span></el-col>
          <el-col :span="12"><span>研究周期：{{information.yanjiuzhouqi}}</span></el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"><span>合同乙方：{{information.hetongyifang}}</span></el-col>
          <el-col :span="12"><span>负责人：{{information.lianxiren}}</span></el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"><span>联系方式：{{information.lianxifangshi}}</span></el-col>
          <!-- <el-col :span="12"><span>承研单位：XXXXXX</span></el-col> -->
        </el-row>
      </div>
      <div class="risk">
        <div class="informationTop">
          <span
            ><i class="el-icon-data-analysis"></i
            ><span>技术关键程度评估表</span></span
          >
        </div>
        <div class="importance">
          <div>
            <Edit ref="jishupg" @change="look"/>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-button @click="$router.back()">取消</el-button>
        <el-button class="generalButton" @click="tijiao()">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Edit from "@/components/TechnologyMaturityAssessment/step/edit.vue";
import { getGuanjianjsxinxi, getGuanjianjsAssess } from "../../../api/jssgl";
export default {
  data() {
    return {
      information: {}
    }
  },
  components: {
    Edit,
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var id = parseInt(this.$route.query.id)
      getGuanjianjsxinxi(id).then(res => {
        console.log(res, '基本信息')
        this.information = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    tijiao() {
      let info = this.$refs.jishupg.info_
      console.log(info, 'info');
      const id = parseInt(this.$route.query.id)
      getGuanjianjsAssess(id, {gjjspgbtext: info}).then(res => {
        console.log(res, 'sss')
        // 提交成功
        this.$router.push('/technology')
      }).catch(err => {
        console.log(err)
      })
    },
    look(html) {
      console.log(html);
    }
  }
}
</script>

<style lang="less" scoped>
#riskAssessment {
  color: #000;
  padding: 1.4286rem;
}
.information {
  padding-bottom: 1.5rem;
  background-color: #fff;
}
.informationTop {
  background: #f7f7f7;
  padding: 0.2857rem;
  border-bottom: 1px solid #e9e9e9;
  span {
    padding: 0.5rem;
    color: #81a9c8;
  }
}
#main {
  margin-top: 2%;
  margin-left: 20%;
  .el-col {
    margin: 20px 0;
  }
}
.footer {
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>