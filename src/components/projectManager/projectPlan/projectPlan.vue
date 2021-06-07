<template>
  <div id="projectPlan">
    <div class="search">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="计划名称：">
          <el-input
            v-model="searchFrom.name"
            placeholder="请输入工程名称"
            style="width: 13.9286rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="起止日期：">
          <el-date-picker
            v-model="searchFrom.time"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-left: 0.7143rem">
          <el-button
            class="generalButton"
            icon="el-icon-search"
            @click="searchList"
            >查询</el-button
          >
          <el-button class="generalButton" icon="el-icon-refresh-right"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
      <div>
        <el-button class="generalButton" icon="el-icon-plus">新增</el-button>
        <el-button class="generalButton" icon="el-icon-plus"
          >导入计划</el-button
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
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
          :index="indexMethod"
        >
        </el-table-column>
        <el-table-column v-for='(item,index) in tabCols' :key = index :prop="item.prop" :label="item.label" align="center">
            <template slot-scope="scope">
               <el-button v-if="item.type=='btn'"
               :type=item.typeList :style=item.style @click="item.click(scope.row)" :cell=plain size='mini'>
                    {{scope.row[item.prop]}}
               </el-button>
               <template v-else-if="item.type=='btnList'">
                <el-button v-for="(items,index) in item.List"
                :key=index
               :type=items.typeList :style=items.style @click="items.click(scope.row)" :plain='items.plain'  size='mini'>
                   {{items.prop}}
               </el-button>
               <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>   
               </template>
               <span v-else>
                   {{scope.row[item.prop]}}
               </span>
            </template>
        </el-table-column>
        <el-table-column prop="subject" label="所属课题" align="center">
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="完成时间" align="center">
        </el-table-column>
        <el-table-column prop="ProjectName" label="工期" align="center">
        </el-table-column>
        <el-table-column prop="work" label="计划负责人" align="center">
        </el-table-column>
        <el-table-column prop="note" label="是否里程碑" align="center">
        </el-table-column>
        <el-table-column prop="istrue" label="完成状态" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template>
            <el-button type="text" style="padding-right: 0.5rem"
              >编辑</el-button
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
                <el-button type="text" style="color: #000" @click="details"
                  >查看详情</el-button
                >
                <el-button type="text" style="color: #000">删除</el-button>
              </div>
              <el-button type="text" slot="reference"
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
    <Dialong :isDialog="isDialog" @closeDialog="closeDialog"></Dialong>
  </div>
</template>

<script>
import Dialong from "./detailsDialog";
export default {
  components: {
    Dialong,
  },
  data() {
    return {
        tabCols:[
            {label:'计划名称',prop:'name'},
            // {label:'操作',prop:'work',type:'btnList',typeList:'primary',style:'color: #000',plain:'plain',
            // List:[
            //   {label:'操作',prop:'编辑',type:'btnList',typeList:'primary',style:'color: #000',plain:'plain'},
            //   {label:'操作',prop:'操作',type:'btnList',typeList:'primary',style:'color: #000',plain:'plain'},
            // ]},
        ],
      // 表格是否多选
      selectData: [],
      // 是否打开详情对话框
      isDialog: false,
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
      tableData: [],
    };
  },
  methods: {
      /* 查询列表 */
      searchList(){

      },
      /* 获取表格 */
    getTabList() {
      this.tableData = [
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          subject: "abc",
          istrue: "完成",
        },
      ];
    },
    /* 序号自定义 */
    indexMethod(index) {
      return index + 1;
    },
    // 清除选中项
    clear() {
      (this.selectData = []), this.$refs.multipleTable.clearSelection();
    },
    // 是否关闭对话框
    closeDialog() {
      this.isDialog = false;
    },
    // 详情按钮
    details() {
      this.isDialog = true;
    },
    // 表格的多选
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
  mounted(){
      this.getTabList()
  }
};
</script>

<style lang="less" scoped>
#projectPlan {
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
.generalButton {
  background: #2a689f;
  color: #fff;
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
</style>