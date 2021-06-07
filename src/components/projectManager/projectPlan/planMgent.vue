<template>
  <div id="technologydecompose">
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
        ref="multipleTable"
        :data="tableData"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
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
        <el-table-column align="left" prop="name" label="名称">
        </el-table-column>
        <el-table-column prop="data" label="类型" align="center">
        </el-table-column>
        <el-table-column prop="address" label="简介" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="scope">
            <template v-if="scope.row.pid">
              <el-button
                type="text"
                style="padding-right: 0.5rem; border-right: 1px solid #f3f3f3"
                >编辑</el-button
              >
              <el-button
                type="text"
                style="padding-right: 0.5rem; border-right: 1px solid #f3f3f3"
                @click="addLowerLevel(scope.row)"
                >添加下级</el-button
              >
              <el-button
                type="text"
                style="padding-right: 0.5rem; border-right: 1px solid #f3f3f3"
                >详情</el-button
              >
              <el-button type="text" style="padding-right: 0.5rem"
                >删除</el-button
              >
            </template>
            <template v-else>
              <el-button
                type="text"
                style="padding-right: 0.5rem"
                @click="addLowerLevel(scope.row)"
                >添加下级</el-button
              >
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 200, 300, 400]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.pageTotal"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      height="60%"
      :before-close="handleClose"
    >
      <el-row>
        <el-form
          :model="elForm"
          status-icon
          :rules="elRules"
          ref="elForm"
          label-width="6rem"
          class="elForm"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="计划名称" prop="planName">
                <el-input
                  v-model="elForm.planNmae"
                  size="mini"
                  placeholder="请输入计划名称"
                  maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开始时间" prop="planName">
                <el-date-picker
                  @change="datChange"
                  v-model="elForm.value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="预计完成时间" prop="planName">
                <el-date-picker
                  @change="datChange"
                  v-model="elForm.value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="实际完成时间" prop="planName">
                <el-date-picker
                  @change="datChange"
                  v-model="elForm.value1"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="责任单位" prop="planName">
                <el-input
                  v-model="elForm.planNmae"
                  size="mini"
                  placeholder="请输入责任单位"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="完成状态" prop="planName">
                <el-select v-model="elForm.value" placeholder="请选择">
                  <el-option
                    v-for="item in stateOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="成果形式" prop="planName">
                <el-input
                  v-model="elForm.planNmae"
                  size="mini"
                  placeholder="请输入成果形式"
                  maxlength="50"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="文件上传" prop="planName">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    只能上传jpg/png文件，且不超过500kb
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <div
        style="
          display: -webkit-flex;
          display: flex;
          -webkit-align-items: center;
          align-items: center;
          -webkit-justify-content: center;
          justify-content: center;
        "
      >
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {
    // addLevelDialog
  },
  data() {
    return {
      /* 是否打开对话框 */
      dialogVisible: false,
      /* 新增form */
      elForm: {},
      /* 新增form正则 */
      elRules: {
        planName: [{}],
      },
      /* 完成状态 */
      stateOptions: [
        { label: "已完成", value: "resoleve" },
        { label: "未完成", value: "reject" },
        { label: "进行中", value: "padding" },
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
      searchFrom: {
        name: "",
        time: [],
      },
      // 表格
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          children: [],
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "a",
              address: "上海市普陀区金沙江路 1519 弄",
              pid: 3,
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "a",
              address: "上海市普陀区金沙江路 1519 弄",
              pid: 3,
              children: [
                {
                  id: 333,
                  date: "2016-05-01",
                  name: "a",
                  address: "上海市普陀区金沙江路 1519 弄",
                  pid: 32,
                },
              ],
            },
          ],
        },
      ],
      // 表单
      form: {
        region: "",
        researchObject: "",
        researchContents: "",
        difficulties: "",
        Signature: "",
        type: [
          {
            indexName: "",
            indexValue: "",
          },
        ],
      },
      // 多选
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    };
  },
  methods: {
    /* 文件上传 开始*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /* 文件上传 结束 */
    /* 日期 */
    datChange() {
      console.log(this.elForm.value1);
    },
    // 添加下级
    addLowerLevel(row) {
      console.log(row, this.tableData);
      this.dialogVisible = true;
    },
    /* 关闭弹框 */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //关闭对话框
    closeDialog() {
      // this.isDialog = false;
    },

    // 清除选中项
    clear() {
      (this.selectData = []), this.$refs.multipleTable.clearSelection();
    },
    // 是否关闭经费管理对话框
    closeDialog() {
      // this.isDialog = false;
    },
    // 详情按钮
    managementBtn() {
      // this.isDialog = true;
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    // 页数总数改变
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
    },
  },
};
</script>

<style lang="less" scoped>
#technologydecompose {
  background: #fff;
  color: #000;
  padding: 1.4286rem;
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
/deep/.el-form-item__content .el-select,
.el-form-item__content .el-date-editor {
  width: 100%;
}
</style>