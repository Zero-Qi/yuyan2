<template>
    <div id="riskAssessment">
        <div class="information">
            <div class="informationTop">
                <span><i class="el-icon-document"></i><span>基本信息</span></span>
            </div>
            <div class="informationBottom">
                <div class="informationBottom-left">
                    <span>工程名称：</span>
                    <span>技术名称：</span>
                </div>
                <div class="informationBottom-right">
                    <span>领域名称：</span>
                    <span>技术负责人：</span>
                </div>
            </div>
        </div>
        <div class="risk">
            <div class="informationTop">
                <span><i class="el-icon-data-analysis"></i><span>风险信息采集</span></span>
            </div>
            <div class="importance">
                <div class="importanceTop"><span>重要性检查</span></div>
                <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC',textAlign:'center'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                    <el-table-column
                    label="序号" type="index" width="80" align="center">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="风险要素" align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    label="风险发生可能性" align="left"
                    >
                    <template v-slot="scope">
                    <el-checkbox-group v-model="scope.row.startTime">
                        <el-checkbox label="很可能"></el-checkbox>
                        <el-checkbox label="可能"></el-checkbox>
                        <el-checkbox label="少"></el-checkbox>
                        <el-checkbox label="很少" style="margin-left: 28px;"></el-checkbox>
                        <el-checkbox label="极少"></el-checkbox>
                    </el-checkbox-group>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="endTime"
                    label="风险描述" align="center"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="ProjectName"
                    label="风险后果严重性" align="left"
                    >
                    <template v-slot="scope">
                    <el-checkbox-group v-model="scope.row.ProjectName">
                        <el-checkbox label="轻微"></el-checkbox>
                        <el-checkbox label="轻度"></el-checkbox>
                        <el-checkbox label="中等"></el-checkbox>
                        <el-checkbox label="严重"></el-checkbox>
                        <el-checkbox label="灾难"></el-checkbox>
                    </el-checkbox-group>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="ba"
                    label="风险控制措施" align="center"
                    >
                    </el-table-column>
                </el-table>
                </div>
                <div class="bottom">
                        <span>评价理由:</span>
                        <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        v-model="input">
                        </el-input>
                </div>
                <div class="button">
                    <el-button>取消</el-button>
                    <el-button class="generalButton" @click="submitBtn">提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                // 评价理由
                input:'',
                // 表格
                tableData:[
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                    {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                     {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    },
                     {
                        name: '张三',
                        startTime:[],
                        endTime:'456',
                        ProjectName:[],
                        ba:''
                    }
                ]
            }
        },
        methods:{
             // 更改边框颜色
            cellStyle(){
                return "border-color:#BDE1FC;"
            },
            //提交按钮
            submitBtn(){
                this.$router.push({path:'evaluationtasks'})
            }
        }
    }
</script>

<style lang="less" scoped>
#riskAssessment{
    color: #000;
    padding: 1.4286rem;
}
.information{
    padding-bottom: 1.5rem;
}
.informationTop{
    background: #F7F7F7;
    padding: 0.2857rem;
    border-bottom: 1px solid #E9E9E9;
    span{
        padding: 0.5rem;
        color: #81A9C8;
    }
}  
.informationBottom{
    background: #fff;
    display: flex;
    padding: 1.5rem 0;
    align-items: center;
    justify-content: space-around;
}
.informationBottom-left{
    display: flex;
    align-items: center;
    flex-direction: column;
    span{
        padding-bottom: 1.5rem;
    }
}
.informationBottom-right{
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
        padding-bottom: 1.5rem;
    }
}
.importance{
    padding: 1.0714rem;
    background: #fff;
}
.importanceTop{
    margin-left: 2.5rem;
    color: #9ABFDB;
    padding-bottom: 0.5rem;
    span{
        padding-bottom: 0.4286rem;
        border-bottom: 2px solid #719DC0;
    }
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #BDE1FC;
}
 .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #BDE1FC;
}
.table{
    padding-bottom: 1.1429rem;
}
.bottom{
    display: flex;
    span{
        padding-left: 3rem;
        width: 80.0006px;
        display: flex;
    }
}
.button{
    padding-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>