<template>
    <div id="evaluationTasks">
        <div  class="search">
            <el-form :inline="true" :model="searchFrom" class="demo-form-inline">
                <el-col :span="7">
                    <div class="searchSelect">
                        <span>评估状态：</span>
                        <el-select v-model="searchFrom.name" placeholder="请选择" style="width:100%">
                                <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="searchSelect">
                        <span>任务类型：</span>
                        <el-select v-model="searchFrom.value" placeholder="请选择" style="width:100%">
                                <el-option
                                v-for="item in option"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-form-item style="margin-left:1rem;">
                    <el-button class="generalButton" icon="el-icon-search">查询</el-button>
                    <el-button class="generalButton" icon="el-icon-refresh-right">重置</el-button>
                </el-form-item>
            </el-form>
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
                label="工程名称" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="startTime"
                label="任务名称" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="endTime"
                label="任务类型" align="center"
                >
                </el-table-column>
                <el-table-column
                prop="ProjectName"
                label="评估状态" align="center"
                >
                </el-table-column>
                <el-table-column align="center"
                label="操作"
                >
                <template v-slot="scope">
                    <el-button type="text" style="padding-right:0.5rem;border-right:1px solid #F5F5F5;">编辑</el-button>
                    <el-button v-if="scope.row.ProjectName=='未开始'" type="text" style="padding-right:0.5rem;border-right:1px solid #F5F5F5;">开始评估</el-button>
                    <el-popover
                    placement="bottom"
                    trigger="click">
                    <div style="display:flex;flex-direction: column;align-items: center;justify-content: center;">
                        <el-button type="text" style="color:#000" @click="assessmentBtn">详情</el-button>
                        <el-button type="text" style="color:#000" @click="proficiencyBtn">报告下载</el-button>
                        <el-button type="text" style="color:#000">删除</el-button>
                    </div>
                    <el-button type="text" slot="reference" style="padding-left:0.5rem;">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
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
                :total="pageInfo.pageTotal">
                </el-pagination>
        </div>
        <addEvaluationDialog :addDialog="addDialog" @closeDialog="closeDialog" :rules="rules" :input.sync="input" :tableDataDialog="tableDataDialog" :ruleForm.sync="ruleForm"></addEvaluationDialog>
        <technicalMaturityDialog :proficiencyDialog="proficiencyDialog" @closeDialog="closeDialog" :proficiencyTabledate="proficiencyTabledate"></technicalMaturityDialog>
    </div>
</template>

<script>
import addEvaluationDialog from './addEvaluationDialog'
import technicalMaturityDialog from './technicalMaturityDialog'
    export default {
        components:{
            addEvaluationDialog,
            technicalMaturityDialog
        },
        data(){
            return {
                // 是否打开技术评估收敛都对话框表格数据
                proficiencyTabledate:
                {   
                    stata:'',
                    validation:'',
                    environment:'',
                    tableData:[
                        {
                            name:'发现支撑该技术研发的基本原理或看到基本原理的报道',
                            stataname:'123',
                            validationname:'456',
                            environmentname:'789'
                        },
                        {
                            name:'发现支撑该技术研发的基本原理或看到基本原理的报道',
                            stataname:'',
                            validationname:'',
                            environmentname:''
                        }
                    ],
                    tableData1:[
                        {
                            name:'技术状态',
                            TRL:'123',
                        },
                    ]
                },
                // 是否打开技术评估熟练度对话框
                proficiencyDialog:false,
                // 对话框表单
                ruleForm:{
                    input:''
                },
                rules:{
                    input: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                },
                // 对话框表格
                tableDataDialog:[
                    {
                        name:'在各个级别上应该完成的任务',
                        stata:'CTE载体的技术状态',
                        validation:'验证的载体（集成度）',
                        environment:'验证环境'
                    },
                    {
                        name:'',
                        stata:'',
                        validation:'',
                        environment:''
                    },
                    {
                        name:'',
                        stata:'',
                        validation:'',
                        environment:''
                    },
                    {
                        name:'',
                        stata:'',
                        validation:'',
                        environment:''
                    },
                    {
                        name:'',
                        stata:'',
                        validation:'',
                        environment:''
                    }
                    
                ],
                // 对话框输入信息
                input:'',
                // 新增对话框是否显示
                addDialog:false,
                // 选择列表
                 option: [{
                    value: '选项1',
                    label: '黄金糕'
                    }, {
                    value: '选项2',
                    label: '双皮奶'
                    }, {
                    value: '选项3',
                    label: '蚵仔煎'
                    }, {
                    value: '选项4',
                    label: '龙须面'
                    }, {
                    value: '选项5',
                    label: '北京烤鸭'
                 }],
                // 选中表格多少跳
                selectData:[],
                // 经费管理对话框是否显示
                isDialog:false,
                // 分页
                pageInfo:{
                    currentPage:1,
                    pageTotal:0,
                    pageSize:10
                },
                // 表单
                searchFrom:{
                    name:'',
                    value:''
                },
                // 表格
                tableData:[
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'未开始',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'未开始',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'未开始',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'未开始',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                    },
                    {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'未开始',
                    },
                     {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'你猜',
                    },
                     {
                        name: '张三',
                        startTime:'123',
                        endTime:'456',
                        ProjectName:'未开始',
                    }
                ]
            }
        },
        methods:{
            
            // 风险评价按钮
            assessmentBtn(){
                this.$router.push({path:'riskAssessment'})
            },
            // 新增按钮打开对话框
            addBtn(){
                this.addDialog=true
            },
            // 关闭对话框
            closeDialog(){
                this.addDialog=false
                this.proficiencyDialog=false
                // console.log(this.addDialog)
            },
            // 清除选中项
            clear(){
                this.selectData=[],
                this.$refs.multipleTable.clearSelection()
            },
            // 技术风险度评价按钮
            proficiencyBtn(){
                this.proficiencyDialog=true
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
#evaluationTasks{
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
.searchSelect{
    display: flex;
    margin-left:1rem;
    span{
        display: flex;
        align-items: center;
        width: 7.1429rem;
    }
}
</style>