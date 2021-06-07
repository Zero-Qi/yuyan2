<template>
  <el-dialog
    customClass="customWidth"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
  >
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
      <el-form-item label="用户名称：">
        <el-input
          v-model="searchFrom.name"
          placeholder="请输入工程名称"
          style="width: 13.9286rem"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 0.7143rem">
        <el-button class="generalButton" icon="el-icon-search">查询</el-button>
        <el-button class="generalButton" icon="el-icon-refresh-right"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
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
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column prop="name" label="领域名称" align="center">
      </el-table-column>
      <el-table-column prop="startTime" label="课题名称" align="center">
      </el-table-column>
      <el-table-column prop="endTime" label="关键程度" align="center">
      </el-table-column>
      <el-table-column align="center" label="操作"> </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>
 
<script>
export default {
name: 'seleceZjz',
  data() {
    return {
      searchFrom: {
        name: "",
        time: [],
      },
      tableData: [
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
      ],
      option1: [
        { label: "初始", value: "1" },
        { label: "中期", value: "2" },
        { label: "结项", value: "3" },
        { label: "其他", value: "4" },
      ],
      option: [
        { label: "初始", value: "1" },
        { label: "中期", value: "2" },
        { label: "结项", value: "3" },
        { label: "其他", value: "4" },
      ],
      multipleSelection: [],
      visible: this.show,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  methods: {
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    close() {
      this.$emit("close");
    },
    ok() {
      this.$$emit("ok");
    },
  },
};
</script>
 <style>
.customWidth {
  width: 80%;
}
</style>
