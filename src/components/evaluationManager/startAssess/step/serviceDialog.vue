<template>
  <el-dialog
    customClass="customWidth"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
  >
    <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
      <el-form-item label="关联领域：">
        <el-select
          v-model="searchFrom.value"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in option1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="技术名称：">
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column prop="lymc" label="领域名称" align="center">
      </el-table-column>
      <el-table-column prop="jsmc" label="技术名称" align="center">
      </el-table-column>
      <el-table-column prop="gjcd" label="关键程度" align="center">
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>
 
<script>
import { getgjjs } from "api/jscsdpg.js";
export default {
  data() {
    return {
      searchFrom: {
        name: "",
        time: [],
      },
      tableData: [
        {
          lymc: "张三",
          jsmc: "456",
          gjcd: "4111",
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
    getgjjsglb() {
      getgjjs().then((res) => {
        this.tableData = res.data;
        console.log(this.tableData);
      });
    },
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
      this.multipleSelection = []
      var _this = this
      val.forEach(function(item){
          _this.multipleSelection.push(item)
      })
    },
    close() {
      this.$emit("close");
    },
    ok() {
      this.$emit("ok",this.multipleSelection);
      this.getgjjsglb();

    },
  },
  mounted() {
    this.getgjjsglb();
  },
};
</script>
 <style>
.customWidth {
  width: 80%;
}
</style>
