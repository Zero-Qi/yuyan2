<template>
  <div id="riskAssessment">
    <div class="information">
      <div class="informationTop">
        <span><i class="el-icon-document"></i><span>流程示意图</span></span>
      </div>
      <div class="informationBottom">
        <el-steps :active="2" align-center>
          <el-step title="选择关键技术" description=""></el-step>
          <el-step title="选择专家组" description=""></el-step>
          <el-step title="进行评估" description=""></el-step>
          <el-step title="完成评估" description="描述性文字"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="risk">
      <div class="informationTop">
        <span
          ><i class="el-icon-data-analysis"></i><span>进行评估</span></span
        >
      </div>
      <div class="importance">
        <div>
          <span>导入评估表：</span>
           <edit/>
        </div>
       
      </div>
      <div>
        <div class="importance1">
          <span>导入专家分项意见：</span>
           <edit/>
        </div>
         <div class="drpgb">
          <span>导入评估表：</span>
          <el-button
              >添加附件</el-button
            >
        </div>
        <div class="button">
          <el-button>上一步</el-button>
          <el-button>暂存</el-button>
          <el-button class="generalButton" @click="submitBtn">取消</el-button>
          <el-button @click="next">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import edit from './step/edit'
export default {
  components:{
    edit
  },
  data() {
    return {
      // 评价理由
      input: "",
      searchFrom: {},
      selectData: {},
      // 评估阶段
      option: [
        { label: "初始", value: "1" },
        { label: "中期", value: "2" },
        { label: "结项", value: "3" },
        { label: "其他", value: "4" },
      ],
      // 表格
      tableData: [
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
      ],
      active: 0
    };
  },
  methods: {
    // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    //提交按钮
    submitBtn() {
      this.$router.push({ path: "evaluationtasks" });
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    next() {
              this.$router.push('/step4')
}
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
.importance1 {
  padding: 1.0714rem;
  background: #fff;
  margin-top: 2.5rem;
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
.drpgb{
  background-color: #fff;
  padding-left: 1rem;
}
</style>