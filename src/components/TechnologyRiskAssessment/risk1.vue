<template>
  <div id="riskAssessment">
    <div class="information">
      <div class="informationTop">
        <span><i class="el-icon-document"></i><span>流程示意图</span></span>
      </div>
      <div class="informationBottom">
        <el-steps :active="0" align-center>
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
          ><i class="el-icon-data-analysis"></i><span>选择关键技术</span></span
        >
      </div>
      <div class="search">
        <el-form
          :inline="true"
          :model="jsfxpgb"
          class="demo-form-inline"
          id="gjjs"
        >
          <el-col :span="7" :xs="24" :sm="10" :md="10" :lg="12">
            <el-form-item label="任务名称：">
              <el-input
                v-model="jsfxpgb.rwmc"
                placeholder="请输入任务名称"
                style="width: 13.9286rem"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :xs="24" :sm="10" :md="10" :lg="12">
            <el-form-item label="合同乙方：">
              <el-input
                v-model="jsfxpgb.htyf"
                placeholder="请输入合同乙方"
                style="width: 13.9286rem"
              ></el-input>
            </el-form-item>
          </el-col>
        
        
          <el-col :span="2" :xs="24" :sm="10" :md="10" :lg="12">
            <el-form-item label="评价地点：">
              <el-input
                v-model="jsfxpgb.pjdd"
                placeholder="请输入评价地点"
                style="width: 13.9286rem"
              ></el-input>
            </el-form-item>
          </el-col>
            <el-col :span="7" :xs="24" :sm="10" :md="10" :lg="12">
            <el-form-item label="评价时间：">
              <el-date-picker
                v-model="jsfxpgb.pjsj"
                type="date"
                placeholder="请选择开始日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <service-dialog
            :show.sync="show"
            @close="close"
            @ok="ok"
          ></service-dialog>
          <el-form-item label="">
            <el-row>
              <el-col :span="24">
                <span style="font-size: 16px">关键技术：</span>
                <el-button
                  class="generalButton"
                  icon="el-icon-plus"
                  @click="open"
                  >选择</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
         
        </el-form>
      </div>
      <div class="importance">
        <div class="table">
          <el-alert style="background: #e6f7ff" :closable="false">
            <span style="color: #64736c">已选择</span>
            <span style="color: #519df8">{{ selectData.length }}</span>
            <span style="padding-right: 1.3571rem; color: #64736c">项</span>
            <span style="color: #519df8; cursor: pointer" @click="clear()"
              >清空</span
            >
          </el-alert>
          <el-table
            v-if="tableData.length != 0"
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
            <el-table-column prop="lymc" label="领域名称" align="center">
            </el-table-column>
            <el-table-column prop="jsmc" label="课题名称" align="center">
            </el-table-column>
            <el-table-column prop="gjcd" label="关键程度" align="center">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button type="text" style="padding-right: 0.5rem"
                @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="tableData.currentPage"
            :page-sizes="[10, 200, 300, 400]"
            :page-size="tableData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.pageTotal"
          >
          </el-pagination>
        </div>
        <div class="button">
          <el-button>暂存</el-button>
          <el-button class="generalButton" @click="submitBtn">取消</el-button>
          <el-button @click="next">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOnegjjs, Uploadwjzz} from "api/jsfxpg";
import serviceDialog from "components/TechnologyMaturityAssessment/step/serviceDialog.vue";
export default {
  components: {
    serviceDialog,
  },
  data() {
    return {
      id:'',
      fileList: [],
      show: false,
      // 评价理由
      input: "",
      jsfxpgb: {},
      time: "",
      selectData: {},
      // 评估阶段
      option: [
        { label: "初始", value: "0" },
        { label: "中期", value: "1" },
        { label: "终期", value: "2" },
      ],
      // 表格
      tableData: [],
      active: 0,
    };
  },
  methods: {
     handleDelete:function(index,row){//删除行数
            this.tableData.splice(index, 1)
        },
    
    ok(data) {
      this.show = false;
      console.log(data);
      this.tableData = data;
    },
    close() {
      this.show = false;
    },
    open() {
      this.show = true;
    },
    // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    //提交按钮
    submitBtn() {
      
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    next() {
      const data = this.tableData;
      var str = "";
      data.forEach((element) => {
        str += element.gjjsid + ",";
      });
      let sj = {
        ids: str,
        jsfxpgb: this.jsfxpgb,
      };
      console.log(sj);
      getOnegjjs(sj).then((res) => {
        this.id = res.data.id
        console.log(res.data.id);
        this.$router.push({
          path: "/risk2",
          query: {
            id: res.data.id,
          },
        });
      });
    },
  },
  mounted() {},
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
  background: #fff;
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
  display: flex;
  align-items: center;
  justify-content: center;
}
#gjjs {
  margin-top: 2%;
  margin-left: 5%;
}

.risk {
  background-color: #fff;
}
</style>