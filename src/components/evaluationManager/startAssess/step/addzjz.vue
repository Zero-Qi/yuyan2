<template>
 <div class="importance">
        <selece-zjz :show.sync="show"></selece-zjz>
        <div>
          <span class="zjz">专家组{{index+1}}</span>
          <span class="select"
            >选择专家：<el-button class="generalButton" icon="el-icon-plus" @click="open"
              >新增</el-button
            ></span
          >
          <el-button class="generalButton" id="qk" @click="deleteAll">清空</el-button>
        </div>
        <div class="table" id="foot">
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
          >
            <el-table-column type="selection"> </el-table-column>
            <el-table-column
              label="序号"
              type="index"
              width="80"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="startTime" label="联系方式" align="center">
            </el-table-column>
            <el-table-column prop="endTime" label="身份" align="center">
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template>
                <el-button type="text" style="padding-right: 0.5rem"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
</template>

<script>
import seleceZjz from './seleceZjz'
export default {
  components:{
    seleceZjz
  },
    props:{
        index: {
            type: Number,
            required: true
        },
        items:{
            type: Array,
            default: Array,
        }
    },
 data() {
    return {
      show: false,
      // 评价理由
      input: "",
      searchFrom: {},
      selectData: {},
      // 评估阶段
      option: [
        { label: "初始", value: "1" },
        { label: "中期", value: "2" },
        { label: "结项", value: "3" },
        { label: "其他", value: "4" },
      ],
      // 表格
      tableData: [
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
        {
          name: "张三",
          startTime: [],
          endTime: "456",
          ProjectName: [],
          ba: "",
        },
      ],
      active: 0,
    };
  },
 methods: {
   open () {
        this.show = true;
            },
       // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    deleteAll(){
        this.$emit('deleteIndex', this.index)
    }
 },
}
</script>

<style lang="less" scoped>
#qk{
  margin-left: 60%;
}
#foot{
  margin-top: .833333rem;
}
.select{
    margin-left: 10%;
}
.zjz{
    font-weight:bold;
    font-size: 22px;
}
</style>
