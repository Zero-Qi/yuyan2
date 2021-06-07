<template>
  <!-- 专家管理 -->
  <div id="projectContract">
    <div class="search">
      <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input
            v-model="searchFrom.name"
            placeholder="请输入名称"
            style="width: 13.9286rem"
          ></el-input>
        </el-form-item>
        <el-form-item label="签约日期：">
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
          <el-button class="generalButton" icon="el-icon-search"
            >查询</el-button
          >
          <el-button class="generalButton" icon="el-icon-refresh-right"
            >重置</el-button
          >
          <el-button class="generalButton">统计信息</el-button>
        </el-form-item>
      </el-form>
      <div>
        <el-button class="generalButton" icon="el-icon-plus">新增</el-button>
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
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="合同编号" align="center">
        </el-table-column>
        <el-table-column prop="startTime" label="合同名称" align="center">
        </el-table-column>
        <el-table-column prop="endTime" label="项目编号" align="center">
        </el-table-column>
        <el-table-column prop="ProjectName" label="合同甲方" align="center">
        </el-table-column>
        <el-table-column prop="work" label="合同乙方" align="center">
        </el-table-column>
        <el-table-column prop="note" label="承研单位" align="center">
        </el-table-column>
        <el-table-column prop="projectPerpon" label="项目负责人" align="center">
        </el-table-column>
        <el-table-column prop="data" label="签约日期" align="center">
        </el-table-column>
        <el-table-column prop="belongs" label="所属课题" align="center">
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
                <el-button type="text" style="color: #000">查看详情</el-button>
                <el-button
                  type="text"
                  style="color: #000"
                  @click="managementBtn"
                  >经费管理</el-button
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
      <!-- <dialogManager :isDialog="isDialog" @closeDialog="closeDialog"></dialogManager> -->
    </div>
  </div>
</template>

<script>
// import dialogManager from './managerDialong'
export default {
  components: {
    // dialogManager,
  },
  data() {
    return {
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
      searchFrom: {
        name: "",
        time: [],
      },
      // 表格
      tableData: [
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
        {
          name: "张三",
          startTime: "123",
          endTime: "456",
          ProjectName: "你猜",
          work: "良好",
          note: "加油",
          projectPerpon: "我在",
          data: "123",
          belongs: "a",
        },
      ],
    };
  },
  methods: {
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
#projectContract {
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
</style>