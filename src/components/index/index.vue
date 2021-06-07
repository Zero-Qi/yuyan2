<template>
    <div id="index">
        <div  class="search">
            <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
                <el-form-item label="工程名称：" >
                    <el-input v-model="searchFrom.name" placeholder="请输入工程名称" style="width:13.9286rem"></el-input>
                </el-form-item>
                <el-form-item label="起止日期：">
                        <el-date-picker
                        v-model="searchFrom.time"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </el-form-item>
                <el-form-item style="margin-left:0.7143rem">
                    <el-button class="generalButton" icon="el-icon-search">查询</el-button>
                    <el-button class="generalButton" icon="el-icon-refresh-right">重置</el-button>
                </el-form-item>
            </el-form>
        <div><el-button class="generalButton" icon="el-icon-plus">新增</el-button></div>
        </div>        
        <div class="table">
                <el-alert
                style="background:#E6F7FF;"
                :closable="false">
                <span style="color:#64736C">已选择</span>
                <span style="color:#519DF8">{{selectData.length}}</span>
                <span style="padding-right:1.3571rem;color:#64736C">项</span>
                <span style="color:#519DF8;cursor: pointer;" @click="clear()">清空</span>
            </el-alert>
             <el-table
                ref="multipleTable"
                :data="tableData"
                border
                :cell-style="cellStyle"
                highlight-current-row
                :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                tooltip-effect="dark"
                style="width:100%;margin-top:0.8571rem"
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection" 
                >
                </el-table-column>
                <el-table-column
                label="序号" type="index" width="80" align="center">
                </el-table-column>
                <el-table-column
                prop="name"
                label="上课名称" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="startTime"
                label="开始日期" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="endTime"
                label="完成日期" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="ProjectName"
                label="工程总师" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="work"
                label="工作阶段" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="note"
                label="备注" align="center"
                >
                </el-table-column>
                <el-table-column align="center"
                label="操作"
                >
                <template>
                    <el-button type="text" style="padding-right:0.5rem">编辑</el-button>
                    <el-popover
                    placement="bottom"
                    trigger="click">
                    <div style="display:flex;flex-direction: column;align-items: center;justify-content: center;">
                        <el-button type="text" style="color:#000">选择工程总师</el-button>
                        <el-button type="text" style="color:#000">删除</el-button>
                    </div>
                    <el-button type="text" slot="reference">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
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
                :page-size ="pageInfo.pageSize"
                :page-sizes = "[3, 10, 50, 500]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.pageTotal">
                </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // 表格是否多选
                selectData:[],
                // 分页
                pageInfo:{
                    currentPage:1,
                    pageTotal:100,
                    pageSize:3
                },
                // 表单
                searchFrom:{
                    name:'',
                    time:[]
                },
                // 表格
                tableData:[
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油1'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                     {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                     {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                        note:'加油'
                    }
                ]
            }
        },
        methods:{
            // 清除选中项
            clear(){
                this.selectData=[],
                this.$refs.multipleTable.clearSelection()
            },
            // 选中的项
            handleSelectionChange(val){
                this.selectData=val
            },
            // 更改边框颜色
            cellStyle(){
                return "border-color:#BDE1FC;"
            },
            // 页数总数改变
            handleSizeChange(val){
                console.log('页数总数改变');
                this.pageInfo.pageSize=val
            },
            // 当前页数改变
            handleCurrentChange(val){
                console.log('当前页数改变');
                 this.pageInfo.currentPage=val
            }
        }
    }
</script>

<style lang="less" scoped>
#index{
    background: #fff;
    color: #000;
    padding: 1.4286rem;
}
.search{
    padding-bottom: 0.9286rem;
}
.demo-form-inline{
    width: 100%;
}
.generalButton{
    background: #2A689F;
    color: #fff;
}
 .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #BDE1FC;
}
 .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #BDE1FC;
}
.pagination{
    padding-top: 0.7143rem;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}
</style>