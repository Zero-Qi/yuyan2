<template>
  <div id="riskAssessment">
    <div class="information">
      <div class="informationTop">
        <span><i class="el-icon-document"></i><span>流程示意图</span></span>
      </div>
      <div class="informationBottom">
        <el-steps :active="1" align-center>
          <el-step title="选择关键技术" description=""></el-step>
          <el-step title="选择专家组" description=""></el-step>
          <el-step title="进行评估" description=""></el-step>
          <el-step title="完成评估" description="描述性文字"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="risk">
      <div class="informationTop">
        <span><i class="el-icon-data-analysis"></i><span>选择专家</span></span>
      </div>
      <addzjz
        v-for="(item, index) in items"
        :key="index"
        :index="index"
        :items="items"
        @deleteIndex="del"
        @uploadData="getData"
        ref="a"
      >
      </addzjz>
      <div class="addzjz">
        <el-button class="generalButton" icon="el-icon-plus" @click="add"
          >新增专家组</el-button
        >
      </div>
      <div class="button">
        <el-button>暂存</el-button>
        <el-button class="generalButton" @click="submitBtn">取消</el-button>
        <el-button @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAddzjz, selectZjz } from "api/jsfxpg";
import addzjz from "./step/addzjz";
export default {
  components: {
    addzjz,
  },
  data() {
    return {
      id: "",
      gjjs: [],
      items: [],
      active: 0,
    };
  },
  methods: {
    add() {
      this.items.push(this.zji + 1);
    },
    del: function (index) {
      console.log(index);
      if (index !== 0) {
        this.items.splice(index, 1);
        console.log("deleted:", JSON.stringify(this.items));
      }
    },
    next() {
      let chil = this.$refs.a
      var zjid = ''
      chil.forEach(element => {
        zjid += element.zjstr + ';'
      });
      console.log(zjid);
      selectZjz(this.id,{
        "ids": zjid
      }).then(res=>{
        console.log(res);
      })
      this.$router.push({
        path: "/risk3",
        query: {
          id: this.id
        },
      });
    },
    //提交按钮
    submitBtn() {
      this.$router.push({ path: "evaluationtasks" });
    },
    getData: function (val) {
      let index = val.index;
      this.items[index] = val.data;
      console.log("I got the data:", JSON.stringify(this.items));
    },
  },
  mounted() {
    // console.log(this.$route.query);
    this.id = this.$route.query.id;
    // console.log(this.id);
  },
};
</script>

<style lang="less" scoped>
#riskAssessment {
  color: #000;
  padding: 1.4286rem;
}
.information {
  padding-bottom: 1.5rem;
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
.informationBottom {
  background: #fff;
  display: flex;
  padding: 1.5rem 0;
  width: 100%;
  //   align-items: center;
  //   justify-content: space-around;
}
.informationBottom .el-steps {
  width: 100%;
}
.informationBottom-left {
  display: flex;
  align-items: center;
  flex-direction: column;
  span {
    padding-bottom: 1.5rem;
  }
}
.informationBottom-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    padding-bottom: 1.5rem;
  }
}
.importance {
  padding: 1.0714rem;
  background: #fff;
}
.importanceTop {
  margin-left: 2.5rem;
  color: #9abfdb;
  padding-bottom: 0.5rem;
  span {
    padding-bottom: 0.4286rem;
    border-bottom: 2px solid #719dc0;
  }
}
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: #bde1fc;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #bde1fc;
}
.table {
  padding-bottom: 1.1429rem;
}
.bottom {
  display: flex;
  span {
    padding-left: 3rem;
    width: 80.0006px;
    display: flex;
  }
}
.button {
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.addzjz {
  margin-left: 40%;
}
#foot {
  margin-top: 0.833333rem;
}
</style>