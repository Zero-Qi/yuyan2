<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="70%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
                <div><span>经费列表</span></div>
                <div><i class="el-icon-close"></i></div>
        </div>
        <div class="content">
            <div><el-button class="generalButton" icon="el-icon-plus" style="margin-bottom:0.7143rem">新增</el-button></div>
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
                label="经费ID" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="startTime"
                label="拨款节点" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="endTime"
                label="付款时间" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="ProjectName"
                label="支付金额" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="work"
                label="是否支付" align="center"
                >
                </el-table-column>
                <el-table-column align="center"
                label="操作"
                >
                <template>
                    <el-button type="text" style="padding-right:0.5rem;">编辑</el-button>
                    <span style="border-right:1px solid #767676;width:0.0714rem"></span>
                    <el-button type="text" style="padding-left:0.5rem">删除</el-button>
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
                :total="pageInfo.pageTotal">
                </el-pagination>
        </div>
        </div>
       
        <span slot="footer" class="dialog-footer">
             <div class="contentButton">
                <el-button @click="close()">关闭</el-button>
                <el-button @click="close()" class="generalButton">确定</el-button>
            </div>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['isDialog','closeDialog'],
        data(){
            return {
                // 选中的数组
                selectData:[],
                //对话框是否关闭
                dialogVisible:this.isDialog,
                // 分页
                pageInfo:{
                    currentPage:1,
                    pageTotal:0,
                    pageSize:10
                },
                // 表格
                tableData:[
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                        work:'良好',
                    },
                ]
            }
        },
        watch:{
            isDialog(){
                this.dialogVisible=this.isDialog
            }
        },
        methods:{
            // 清除选中项
            clear(){
                this.selectData=[],
                this.$refs.multipleTable.clearSelection()
            },
            close(){
                this.dialogVisible=false
                this.$emit('closeDialog')
            },
            handleSelectionChange(val){
                this.selectData=val
            },
            // 更改边框颜色
            cellStyle(){
                return "border-color:#BDE1FC;"
            },
            // 页数总数改变
            handleSizeChange(val){
                this.pageInfo.pageSize=val
            },
            // 当前页数改变
            handleCurrentChange(val){
                 this.pageInfo.currentPage=val
            }
        }
    }
</script>

<style lang="less" scoped>
.title{
    color: #000;
    background: #fff;
    font-size: 1.1429rem;
    height: 3.5714rem;
    display: flex;
    align-items: center;
    padding: 0 1.4286rem;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;
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
.contentLeft{
    display: flex;
    flex-direction: column;
    text-align: left;
    span{
        padding-bottom: 1.7857rem;
    }
}
.contentButton{
    display: flex;
    align-items: center;
    justify-content: center;
}
.contentRight{
    display: flex;
    flex-direction: column;
    text-align: left;
    span{
        padding-bottom: 1.7857rem;
    }
}
.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    background: #fff;
    border-top: 1px solid #dcdcdc;
}

</style>