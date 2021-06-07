<template>
  <div id="technology">
    <div class="search">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-col :span="7">
          <div class="searchSelect">
            <span>姓名：</span>
            <el-input
              v-model="searchFrom.mc"
              placeholder="请输入姓名"
              :rows="3"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="searchSelect">
            <span>擅长领域：</span>
            <el-input
              v-model="searchFrom.mc"
              placeholder="请输入擅长领域"
              :rows="3"
            ></el-input>
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
        <el-table-column prop="xm" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="csny" label="出生年月" align="center">
        </el-table-column>
        <el-table-column prop="gzdw" label="工作单位" align="center">
        </el-table-column>
        <el-table-column prop="zw" label="职务" align="center">
        </el-table-column>
        <el-table-column prop="xl" label="学历" align="center">
        </el-table-column>
        <el-table-column prop="cszy" label="从事专业" align="center">
        </el-table-column>
        <el-table-column prop="jsly" label="技术领域" align="center">
        </el-table-column>
        <el-table-column prop="lxdh" label="联系电话" align="center">
        </el-table-column>
        <!-- <el-table-column label="评估状态" align="center">
          <template slot-scope="scope">
            {{ stateEvaluation(scope.row.pgzt) }}
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              style="padding-right: 0.5rem; border-right: 1px solid #f5f5f5"
              @click="addForm(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" style="padding-right: 0.5rem; border-right: 1px solid #f5f5f5" @click="deleteGuanjianjs(scope.row)">删除</el-button>
            <!-- <el-popover placement="bottom" trigger="click">
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                "
              >
                <el-button type="text" style="color: #000" @click="gjjsxqLook(scope.row)">详情</el-button>
              
                <el-button type="text" style="color: #000" @click="deleteGuanjianjs(scope.row)">删除</el-button>
              </div>
              <el-button
                type="text"
                slot="reference"
                style="padding-left: 0.5rem"
                >更多<i class="el-icon-arrow-down el-icon--right"></i
              ></el-button>
            </el-popover> -->
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
   
    <!-- 新增专家弹框 -->
    <el-dialog
      :visible.sync="addzhuanjiaDialogVisible"
      width="50%"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div slot="title" class="title">
        <div><span>新增专家</span></div>
        <div>
          <i class="el-icon-close" @click="addzhuanjiaDialogVisible = false"></i>
        </div>
      </div>
       <div class="content">
        <el-form
          ref="zhuanjiaform"
          :model="zhuanjiaform"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名：">
            <el-input
              v-model="zhuanjiaform.xm"
              placeholder="请输入姓名"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="出生年月：">
            <el-date-picker
                v-model="zhuanjiaform.csny"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作单位：">
            <el-input
              type="textarea"
              v-model="zhuanjiaform.gzdw"
              placeholder="请输入领域简介"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否军方单位：">
            <el-select
              v-model="zhuanjiaform.name"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                label="是"
                value="0"
              >
              </el-option>
              <el-option
                label="否"
                value="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务：">
            <el-input
              v-model="zhuanjiaform.zw"
              placeholder="请输入职务"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="职称：">
            <el-select
              v-model="zhuanjiaform.zc"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                label="院士"
                value="0"
              >
              </el-option>
              <el-option
                label="研究员"
                value="1"
              >
              </el-option>
              <el-option
                label="副研究员"
                value="2"
              >
              </el-option>
              <el-option
                label="高级工程师"
                value="3"
              >
              </el-option>
              <el-option
                label="工程师"
                value="4"
              >
              </el-option>
              <el-option
                label="教授"
                value="5"
              >
              </el-option>
              <el-option
                label="副教授"
                value="6"
              >
              </el-option>
              <el-option
                label="讲师"
                value="7"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历：">
            <el-select
              v-model="zhuanjiaform.xl"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                label="博士"
                value="0"
              >
              </el-option>
              <el-option
                label="硕士"
                value="1"
              >
              </el-option>
              <el-option
                label="本科"
                value="2"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="从事专业：">
            <el-input
              v-model="zhuanjiaform.cszy"
              placeholder="请输入从事专业"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="技术领域：">
            <el-select
              v-model="zhuanjiaform.jsly"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                label="总体技术"
                value="0"
              >
              </el-option>
              <el-option
                label="专业技术"
                value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input
              v-model="zhuanjiaform.lxdf"
              placeholder="请输入联系电话"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="addzhuanjiaDialogVisible = false">取消</el-button>
          <el-button @click="addzhuanjia" class="generalButton">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 关键技术详情 -->
  </div>
</template>

<script>
import { getzhuanjia, addZhuanjia, editZhuanjia } from "../../api/jcxinxgl.js"
export default {
  components: {
  },
  data() {
    return {
      searchFrom:{},
      zhuanjiaform:{
          xlzt: '1',
          cjr: 'admin',
          gxr: 'admin'
      },
      flag: '0',
      id: '',
      addzhuanjiaDialogVisible: false,
      gjjishuxqDialogTableVisible: false,
      gjjsxqform: {},
      // 对话框是否显示
      isDialog: false,
      // 选择列表
      option: [
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
      tableData: [],
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
        getzhuanjia().then(res => {
            console.log(res, 'hsuij9i');
            this.tableData = res.data
        }).catch(err => {
            console.log(err);
        })
    },
    // 评估状态
    stateEvaluation(status) {
      const statusObj = {
        0: "未评估",
        1: "已评估",
      };
      return statusObj[status];
    },

    // 新增/编辑专家弹框
    addForm(data) {
      this.addzhuanjiaDialogVisible = true
      this.zhuanjiaform = data
      if (data) {
          this.flag = '1'
          this.id = data.id
      } else {
          this.flag = '0'
      }
    //   getjsxinxi().then(res => {
    //     // console.log(res, '获取成功')
    //     this.addtableData = res.data
    //   }).catch(err => {
    //     console.log(err)
    //   })
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
    // 新增庄家
    addzhuanjia() {
    //   var parems = {
    //     jsid: this.addSelectData[0].id,
    //     xlzt: '1',
    //     cjr: this.addSelectData[0].cjr,
    //     gxr: this.addSelectData[0].gxr
    //   }
      addZhuanjia(this.zhuanjiaform).then(res => {
        // console.log(res, '添加成功！')
        this.$message.success('添加成功！')
        this.addzhuanjiaDialogVisible = false
        this.init()
      }).catch(err => {
        console.log(err)
      })
      if (this.flag === '1') {
          // 编辑专家
        editZhuanjia(this.id, this.zhuanjiaform).then(res => {
            console.log(res, '****');
        }).catch(err => {
            console.log(err);
        })
      }
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
      editZhuanjia(value.id, {xlzt: '0'}).then(res => { 
          console.log(res, '删除成功！')
          this.$message.success('删除成功！')
          this.init()
        }).catch(err => {
          console.log(err)
        })
    },
    // 关键程度评估按钮
    editzhuanjia(data) {
      // console.log(data)
      // debugger
    //   this.$router.push({
    //     path: "/criticaldegree",
    //     query: {
    //       id: data.gjjsid
    //     }
    //   })
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