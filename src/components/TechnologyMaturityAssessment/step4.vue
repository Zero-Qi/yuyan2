<template>
  <div id="riskAssessment">
    <div class="information">
      <div class="informationTop">
        <span><i class="el-icon-document"></i><span>评估详情</span></span>
      </div>

      <div class="mian" id="main">
        <el-row :gutter="200">
          <el-col :span="12"
            ><span>任务名称：{{ form.rwmc }}</span></el-col
          >
          <el-col :span="12"
            ><span>合同乙方：{{ form.htyf }}</span></el-col
          >
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"
            ><span>评价时间：{{ form.pjsj }}</span></el-col
          >
          <el-col :span="12"
            ><span>评估阶段：{{ form.pgjd }}</span></el-col
          >
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"
            ><span>评价地点：{{ form.pjdd }}</span></el-col
          >
          <el-col :span="12"
            ><span>评价准则：</span
            ><el-button class="generalButton" @click="downzz"
              >下载</el-button
            ></el-col
          >
        </el-row>
        <el-row :gutter="200">
          <el-col :span="12"
            ><span>专家意见：</span
            ><el-button class="generalButton">查看</el-button></el-col
          >
          <el-col :span="12"
            ><span>评估报告：</span
            ><el-button class="generalButton" @click="downbg"
              >下载</el-button
            ></el-col
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
              v-if="tableData.length != 0"
              @selection-change="handleSelectionChange"
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
              <el-table-column
                label="序号"
                type="index"
                width="80"
                align="center"
              >
              </el-table-column>
              <el-table-column prop="jsmc" label="技术名称" align="center">
              </el-table-column>
              <el-table-column prop="gjcd" label="关键程度" align="center">
              </el-table-column>
              <el-table-column prop="pddj" label="评价级别" align="center">
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
import { hz, downfile } from "api/jscsdpg";
export default {
  data() {
    return {
      id: "",
      // 表格
      tableData: [],
      active: 3,
      form: {},
    };
  },
  methods: {
    downzz() {
       downfile(this.id, 5).then((res) => {
        console.log(res);
        let blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
        });
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', '评估准则.docx');
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link);
        // let objectUrl = URL.createObjectURL(blob);
        // window.location.href = objectUrl;
      });
    },
    downbg() {
      downfile(this.id, 6).then((res) => {
        console.log(res);
        let blob = new Blob([res], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8",
        });
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', '评估报告.docx');
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href)
        document.body.removeChild(link);
        // let objectUrl = URL.createObjectURL(blob);
        // window.location.href = objectUrl;
      });
    },
    // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    //提交按钮
    submitBtn() {
      this.$router.push({ path: "evaluationtasks" });
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleCurrentChange() {},
    next() {
      if (this.active++ > 3) this.active = 0;
    },
    hz() {
      this.id = this.$route.query.id;
      hz(this.id).then((res) => {
        console.log(res.res,'++++++++++++++++++');
        this.tableData = res.res.gjjs;
        this.form = res.res.jscsdpgb;
        console.log(res);
      });
    },
  },
  mounted() {
    // this.$nextTick(() => {
      this.hz();
    // });
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