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
        <el-button class="generalButton" icon="el-icon-search" @click="query">查询</el-button>
        <el-button class="generalButton" icon="el-icon-refresh-right" @click="reset"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
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
      <el-table-column type="selection"> </el-table-column>
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column prop="xm" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="csny" label="出生年月" align="center">
      </el-table-column>
      <el-table-column prop="gzdw" label="工作单位" align="center">
      </el-table-column>
      <el-table-column prop="zw"  align="center" label="职务"> </el-table-column>
        <el-table-column prop="zc" label="职称" align="center">
      </el-table-column>
      <el-table-column prop="xl" label="学历" align="center">
      </el-table-column>
      <el-table-column prop="cszy" label="从事专业" align="center">
      </el-table-column>
      <el-table-column  prop="jsly"  align="center" label="技术领域"> </el-table-column>
        <el-table-column prop="lxdh"  align="center" label="联系电话"> </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </div>
  </el-dialog>
</template>
 
<script>
import { getAddzjz } from "api/jscsdpg";

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
    reset(){
      console.log('sd');
    },
    //查询
    query(){
      console.log('sd');
    },
     getAddzjz(){
     getAddzjz().then(res=>{
       this.tableData = res.data
     })
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
      this.$emit("ok", this.multipleSelection);
    },
  },
  mounted() {
    this.getAddzjz()
  },
};
</script>
 <style>
.customWidth {
  width: 80%;
}
</style>
