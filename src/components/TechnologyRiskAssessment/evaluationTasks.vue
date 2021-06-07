<template>
  <div id="evaluationTasks">
    <div class="search">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-col :span="7">
          <div class="searchSelect">
            <span>评估状态：</span>
            <el-select
              v-model="searchFrom.name"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="searchSelect">
            <span>评估阶段：</span>
            <el-select
              v-model="searchFrom.value"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-form-item style="margin-left: 1rem">
          <el-button class="generalButton" icon="el-icon-search" @click="query"
            >查询</el-button
          >
          <el-button
            class="generalButton"
            icon="el-icon-refresh-right"
            @click="reset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column prop="rwmc" label="任务名称" align="center">
        </el-table-column>
        <el-table-column prop="htyf" label="合同乙方" align="center">
        </el-table-column>
        <el-table-column prop="pjsj" label="评价时间" align="center">
        </el-table-column>
        <el-table-column prop="pgjd" label="评估阶段" align="center">
        </el-table-column>
        <el-table-column prop="pgdd" label="评估地点" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="padding-right: 0.5rem; border-right: 1px solid #f5f5f5"
              @click="handleEdit(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-button
              type="text"
              style="padding-right: 0.5rem; border-right: 1px solid #f5f5f5"
              @click="down(scope.$index, scope.row)"
              >报告下载</el-button
            >
            <el-button
              type="text"
              style="padding-right: 0.5rem; border-right: 1px solid #f5f5f5"
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
        :current-page="pageInfo.currentPage"
        :page-sizes="[10]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getPgrw, delPgrw,downfile} from "api/jsfxpg";
export default {
  components: {},
  data() {
    return {
      multipleSelection:[],
      // 选择列表
      option: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
      // 选中表格多少跳
      selectData: [],
      // 分页
      pageInfo: {
        currentPage: 1,
        pageTotal: 0,
        pageSize: 10,
      },
      // 表单
      searchFrom: {},
      // 表格
      tableData: [],
    };
  },
  methods: {
    down(val, row){
      console.log(row);
      downfile(row.id, 9).then((res) => {
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
    handleEdit(val,row){
        this.$router.push({
        path: "/risk4",
        query: {
          id: row.id
        },
      });
    },
    getPgrw() {
      getPgrw().then((res) => {
        console.log(res, "+++++");
        this.tableData = res.data;
      });
    },
    handleDelete(index, row) {
      //删除行数
      this.tableData.splice(index, 1);
      delPgrw(row.id).then(res=>{
        console.log(res);
      })
    },
    //查询
    reset() {
      console.log("sd");
    },
    //查询
    query() {
      console.log("sd");
    },
    // 风险评价按钮
    assessmentBtn() {
      this.$router.push({ path: "riskAssessment" });
    },
    // 新增按钮打开对话框
    addBtn() {
      this.addDialog = true;
    },
    // 关闭对话框
    closeDialog() {
      this.addDialog = false;
      this.proficiencyDialog = false;
      // console.log(this.addDialog)
    },
    // 清除选中项
    clear() {
      (this.selectData = []), this.$refs.multipleTable.clearSelection();
    },
    // 技术风险度评价按钮
    proficiencyBtn() {
      this.proficiencyDialog = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      var _this = this;
      val.forEach(function (item) {
        _this.multipleSelection.push(item);
      });
      console.log(this.multipleSelection);
    },
    // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    // 页数总数改变
    handleSizeChange(val) {},
    // 当前页数改变
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
    },
  },
  mounted() {
    this.getPgrw();
  },
};
</script>

<style lang="less" scoped>
#evaluationTasks {
  background: #fff;
  color: #000;
  padding: 1.4286rem;
}
.search {
  padding-bottom: 0.9286rem;
}
.demo-form-inline {
  width: 100%;
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
.pagination {
  padding-top: 0.7143rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.searchSelect {
  display: flex;
  margin-left: 1rem;
  span {
    display: flex;
    align-items: center;
    width: 7.1429rem;
  }
}
</style>