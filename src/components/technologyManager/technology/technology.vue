<template>
  <div id="technology">
    <div class="search">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-col :span="7">
          <div class="searchSelect">
            <span>关联领域：</span>
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
            <span>技术名称：</span>
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
          <el-button class="generalButton" icon="el-icon-search"
            >查询</el-button
          >
          <el-button class="generalButton" icon="el-icon-refresh-right"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-button class="generalButton" icon="el-icon-plus" @click="addForm"
          >新增</el-button
        >
      </div>
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
        <el-table-column prop="gcmc" label="工程名称" align="center">
        </el-table-column>
        <el-table-column prop="lymc" label="领域名称" align="center">
        </el-table-column>
        <el-table-column prop="jsmc" label="技术名称" align="center">
        </el-table-column>
        <el-table-column prop="pgmc" label="评估日期" align="center">
        </el-table-column>
        <el-table-column prop="gjcd" label="关键程度" align="center">
        </el-table-column>
        <el-table-column label="评估状态" align="center">
          <template slot-scope="scope">
            {{ stateEvaluation(scope.row.pgzt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="padding-right: 0.5rem; border-right: 1px solid #f5f5f5"
              @click="criticalityBtn(scope.row)"
              >关键程度评估</el-button
            >
            <el-popover placement="bottom" trigger="click">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                "
              >
                <el-button type="text" style="color: #000" @click="gjjsxqLook(scope.row)">详情</el-button>
                <!-- <el-button
                  type="text"
                  style="color: #000"
                  @click="managementBtn"
                  >经费管理</el-button
                > -->
                <el-button type="text" style="color: #000" @click="deleteGuanjianjs(scope.row)">删除</el-button>
              </div>
              <el-button
                type="text"
                slot="reference"
                style="padding-left: 0.5rem"
                >更多<i class="el-icon-arrow-down el-icon--right"></i
              ></el-button>
            </el-popover>
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
    <criticalityDialog
      :tableDataDialog.sync="tableDataDialog"
      :isDialog="isDialog"
      @closeDialog="closeDialog"
    ></criticalityDialog>
    <!-- 新增关键技术弹框 -->
    <el-dialog
      :visible.sync="addgjjishuDialogVisible"
      width="80%"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div slot="title" class="title">
        <div><span>新增关键技术</span></div>
        <div>
          <i class="el-icon-close" @click="addgjjishuDialogVisible = false"></i>
        </div>
      </div>
      <div class="content">
        <el-form
          ref="addgjjishuform"
          :inline="true"
          :model="addgjjishuform"
          label-width="120px"
          class="demo-form-inline"
        >
          <el-form-item label="所属领域：">
            <el-input
              v-model="addgjjishuform.mc"
              placeholder="请输入领域名称"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="技术名称：">
            <el-input
              v-model="addgjjishuform.kssj"
              placeholder="请输入技术名称"
              :rows="3"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="领域简介：">
            <el-input
              type="textarea"
              v-model="form1.yjwcsj"
              placeholder="请输入领域简介"
              :rows="3"
            ></el-input>
          </el-form-item> -->
          <el-form-item style="margin-left: 0.7143rem">
            <el-button class="generalButton" icon="el-icon-search"
              >查询</el-button
            >
            <el-button class="generalButton" icon="el-icon-refresh-right"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="multipleTable"
        :data="addtableData"
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
        @selection-change="addhandleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column prop="mc" label="技术名称" align="center">
        </el-table-column>
        <el-table-column label="所属领域" align="center">
          <template slot-scope="scope">
            {{ formatType(scope.row.jb) }}
          </template>
        </el-table-column>
        <el-table-column prop="yjwcsj" label="简介" align="center">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="addgjjishuDialogVisible = false">取消</el-button>
          <el-button @click="addgjJishu" class="generalButton">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 关键技术详情 -->
    <el-dialog
    :visible.sync="gjjishuxqDialogTableVisible"
    :close-on-click-modal="false"
    :show-close="false"
    width="50%"
    >
    <div slot="title" class="title">
        <div><span>关键技术详情</span></div>
        <div>
          <i class="el-icon-close" @click="gjjishuxqDialogTableVisible = false"></i>
        </div>
      </div>
    <div>
      <el-form
          ref="gjjsxqform"
          :model="gjjsxqform"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="领域名称：">
            <el-input
              v-model="gjjsxqform.lymc"
              placeholder="请输入领域名称"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="技术名称：">
            <el-input
              v-model="gjjsxqform.jsmc"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="评估日期：">
            <el-input
              type="textarea"
              v-model="gjjsxqform.pgmc"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="关键程度：">
            <el-input
              type="textarea"
              v-model="gjjsxqform.gjcd"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="评估状态：">
            <el-input
              type="textarea"
              v-model="gjjsxqform.pgzt"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="gjjishuxqDialogTableVisible = false">返回</el-button>
          <!-- <el-button @click="bianjiLingyu" class="generalButton">确定</el-button> -->
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import criticalityDialog from "./criticalityDialog";
import { getgjjs, getjsxinxi, addguanjianjs, deleteGuanjianjsjk, getGuanjianjsxinxi } from "../../../api/jssgl";
export default {
  components: {
    criticalityDialog,
  },
  data() {
    return {
      addgjjishuDialogVisible: false,
      gjjishuxqDialogTableVisible: false,
      gjjsxqform: {},
      // 对话框表格
      tableDataDialog: {
        a: "",
        Oneradio: 1,
        Tworadio: 1,
        threeradio: 1,
        fourradio: 1,
        one: [
          {
            project: "1",
            id: 1,
            category: "1",
            level: "1",
            name: "1",
            standard: "1",
          },
          {
            project: "2",
            id: 2,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
          {
            project: "1",
            id: 3,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
        ],
        two: [
          {
            project: "2",
            id: 1,
            category: "4",
            level: "5",
            name: "6",
            standard: "7",
          },
          {
            project: "2",
            id: 2,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
          {
            project: "1",
            id: 3,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
        ],
        three: [
          {
            project: "2",
            id: 1,
            category: "4",
            level: "5",
            name: "6",
            standard: "7",
          },
          {
            project: "2",
            id: 2,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
          {
            project: "1",
            id: 3,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
        ],
        four: [
          {
            project: "2",
            id: 1,
            category: "4",
            level: "5",
            name: "6",
            standard: "7",
          },
          {
            project: "2",
            id: 2,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
          {
            project: "1",
            id: 3,
            category: "2",
            level: "3",
            name: "4",
            standard: "5",
          },
        ],
      },
      // 对话框是否显示
      isDialog: false,
      // 选择列表
      option: [
        // {
        //   value: "选项1",
        //   label: "黄金糕",
        // },
        // {
        //   value: "选项2",
        //   label: "双皮奶",
        // },
        // {
        //   value: "选项3",
        //   label: "蚵仔煎",
        // },
        // {
        //   value: "选项4",
        //   label: "龙须面",
        // },
        // {
        //   value: "选项5",
        //   label: "北京烤鸭",
        // },
      ],
      // 选中表格多少跳
      selectData: [],
      // 经费管理对话框是否显示
      isDialog: false,
      // 分页
      pageInfo: {
        currentPage: 1,
        pageTotal: 0,
        pageSize: 10,
      },
      // 表单
      addgjjishuform: {},
      searchFrom: {
        name: "",
        value: "",
      },
      // 表格
      tableData: [
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油'
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油',
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'A',
        //         note:'加油',
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'A',
        //         note:'加油',
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油',
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油',
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油',
        //     },
        //     {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'A',
        //         note:'加油',
        //     },
        //      {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油',
        //     },
        //      {
        //         name: '张三',
        //         startTime:'123',
        //         endTime:'456',
        //         ProjectName:'你猜',
        //         work:'',
        //         note:'加油',
        //     }
      ],
      addtableData: [],
      addSelectData: []
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    // 获取关键技术列表
    init() {
      getgjjs()
        .then((res) => {
          // console.log(res, '获取成功');
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 评估状态
    stateEvaluation(status) {
      const statusObj = {
        0: "未评估",
        1: "已评估",
      };
      return statusObj[status];
    },

    // 新增关键技术弹框
    addForm() {
      this.addgjjishuDialogVisible = true
      getjsxinxi().then(res => {
        // console.log(res, '获取成功')
        this.addtableData = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 所属领域
    formatType(status) {
      const statusObj = {
        0: "工程",
        1: "领域",
        2: "专题",
        3: "技术",
        4: "子技术",
      };
      return statusObj[status];
    },
    // 新增关键技术
    addgjJishu() {
      var parems = {
        jsid: this.addSelectData[0].id,
        xlzt: '1',
        cjr: this.addSelectData[0].cjr,
        gxr: this.addSelectData[0].gxr
      }
      addguanjianjs(parems).then(res => {
        // console.log(res, '添加成功！')
        this.$message.success('添加成功！')
        this.addgjjishuDialogVisible = false
        this.getgjjs()
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看关键技术详情
    gjjsxqLook(data) {
      console.log(data);
      this.gjjishuxqDialogTableVisible = true
      // debugger
      this.gjjsxqform = data
    },
    // 删除关键技术
    deleteGuanjianjs(value) {
      // console.log(value);
      // debugger
      deleteGuanjianjsjk(parseInt(value.gjjsid), {xlzt: '0'}).then(res => { 
          console.log(res, '删除成功！')
          this.$message.success('删除成功！')
          this.getgjjs()
        }).catch(err => {
          console.log(err)
        })
    },
    // 关键程度评估按钮
    criticalityBtn(data) {
      // console.log(data)
      // debugger
      this.$router.push({
        path: "/criticaldegree",
        query: {
          id: data.gjjsid
        }
      })
      // var ids = parseInt(data.gjjsid)
      // getGuanjianjsxinxi({id: data.gjjsid}).then(res => {
      //   console.log(res, '基本信息')
      // }).catch(err => {
      //   console.log(err)
      // })
    },
    // 是否关闭对话框
    closeDialog() {
      this.isDialog = false;
    },
    // 清除选中项
    clear() {
      (this.selectData = []), this.$refs.multipleTable.clearSelection();
    },
    // 是否关闭经费管理对话框
    closeDialog() {
      this.isDialog = false;
    },
    // 详情按钮
    managementBtn() {
      this.isDialog = true;
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 新增弹框选中项
    addhandleSelectionChange(val) {
      console.log(val, '&&&&&');
      this.addSelectData = val
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
#technology {
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
.title {
  color: #000;
  background: #fff;
  font-size: 1.1429rem;
  height: 3.5714rem;
  display: flex;
  align-items: center;
  padding: 0 1.4286rem;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  background: #fff;
  border-top: 1px solid #eeeeee;
}
</style>