<template>
  <div id="riskAssessment">
    <div class="information">
      <div class="informationTop">
        <span><i class="el-icon-document"></i><span>评估详情</span></span>
      </div>

      <div class="mian" id="main">
        <el-row :gutter="200">
          <el-col :span="12"><span>任务名称：XXXXXX</span></el-col>
          <el-col :span="12"><span>承研单位：XXXXXX</span></el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"><span>评价时间：XXXXXX</span></el-col>
          <el-col :span="12"><span>评价阶段：XXXXXX</span></el-col>
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"><span>评价地点：XXXXXX</span></el-col>
          <el-col :span="12"
            ><span>评价准则：</span
            ><el-button class="generalButton">下载</el-button></el-col
          >
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"
            ><span>专家意见：</span
            ><el-button class="generalButton">查看</el-button></el-col
          >
          <el-col :span="12"
            ><span>评估报告：</span
            ><el-button class="generalButton">下载</el-button></el-col
          >
        </el-row>
      </div>
      <div>
        <el-button class="generalButton" id="check"
          >查看成熟度提升统计</el-button
        >
      </div>
      <div class="risk">
        <div class="informationTop">
          <span
            ><i class="el-icon-data-analysis"></i><span>关键技术</span></span
          >
        </div>
        <div class="importance">
          <div class="table">
            <el-table
              ref="multipleTable"
              :data="tableData"
              border
              :cell-style="cellStyle"
              highlight-current-row
              :header-cell-style="{
                background: '#2B69A6',
                color: '#fff',
                borderColor: '#BDE1FC',
              }"
              tooltip-effect="dark"
              style="width: 100%; margin-top: 0.8571rem"
            >
              <el-table-column type="selection"> </el-table-column>
              <el-table-column
                label="序号"
                type="index"
                width="80"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="name" label="技术名称" align="center">
              </el-table-column>
              <el-table-column prop="startTime" label="关键程度" align="center">
              </el-table-column>
              <el-table-column prop="endTime" label="评价级别" align="center">
              </el-table-column>
            </el-table>
          </div>
          <div class="button">
            <el-button @click="next">上一步</el-button>
            <el-button class="generalButton" @click="submitBtn">确定</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      active: 3,
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
    handleSizeChange() {},
    handleCurrentChange() {},
    next() {
      if (this.active++ > 3) this.active = 0;
    },
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
#main {
  margin-top: 2%;
  margin-left: 20%;
}
.el-row {
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0;
  }
}
#check {
  margin-top: 2%;
  margin-left: 40%;
}
</style>