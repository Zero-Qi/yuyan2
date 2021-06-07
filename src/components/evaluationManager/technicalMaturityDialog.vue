<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="70%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
            <span><i class="el-icon-date"></i>自评表</span>
        </div>
        <div class="content">
             <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="proficiencyTabledate.tableData"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                    <el-table-column label="关键技术名称" align="center" width="50%">
                        <el-table-column
                        label="TRL"
                        align="center"
                        type="index"
                        >
                        </el-table-column>
                         <el-table-column label="在各个级别上应该完成的任务"
                        align="center"
                        prop='name'
                        >
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="技术成熟的特征" align="center">
                        <el-table-column
                        align="center"
                        label="技术状态"
                        width="180"
                        >
                         <template v-slot="scope">
                            <el-radio v-model="proficiencyTabledate.stata" :label="scope.row">{{scope.row.stataname}}</el-radio>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="center"
                        label="集成度"
                        width="180"
                        >
                        <template v-slot="scope">
                            <el-radio v-model="proficiencyTabledate.validation" :label="scope.row">{{scope.row.validationname}}</el-radio>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="center"
                        label="试验环境"
                        width="180"
                        >
                        <template v-slot="scope">
                            <el-radio v-model="proficiencyTabledate.environment" :label="scope.row">{{scope.row.environmentname}}</el-radio>
                        </template>
                        </el-table-column>
                    </el-table-column>
                    </el-table>
             </div>
             <div class="table1">
                 <el-table
                    ref="multipleTable"
                    :data="proficiencyTabledate.tableData1"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#fff',color:'#000',borderColor:'#F1F3F4',fontWeight:'normal'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                    <el-table-column label="级别内容"
                        prop='name'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="TRL"
                        >
                            <template slot="header">
                                <span>
                                    <i class="el-icon-edit"></i>
                                    TRL级别评价
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
             </div>
             <div class="table1">
                 <div class="top">
                     <span>发现支持该技术研发的基本原理或看到基本原理的报道</span>
                 </div>
                 <el-table
                    ref="multipleTable"
                    :data="proficiencyTabledate.tableData1"
                    :header-cell-style="{background:'#fff',color:'#000',borderColor:'#F1F3F4',fontWeight:'normal'}"
                    :cell-style="cellStyle"
                    highlight-current-row
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                     <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                    <el-table-column label="评估细则"
                        prop='name'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="TRL"
                        >
                            <template slot="header">
                                <span>
                                    <i class="el-icon-edit"></i>
                                    完成情况
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
             </div>
             <div class="table1">
                 <div class="top">
                     <span>提出技术概念和应用设想</span>
                 </div>
                 <el-table
                    ref="multipleTable"
                    :data="proficiencyTabledate.tableData1"
                    :cell-style="cellStyle"
                    highlight-current-row
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                     <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                    <el-table-column label="评估细则"
                        prop='name'
                        >
                    </el-table-column>
                    <el-table-column
                        prop="TRL"
                        >
                            <template slot="header">
                                <span>
                                    <i class="el-icon-edit"></i>
                                    完成情况
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
             </div>
        </div>
        <span slot="footer" class="dialog-footer">
             <div class="contentButton">
                <el-button @click="close()" class="generalButton">提交</el-button>
                <el-button @click="close()">取消</el-button>
            </div>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['proficiencyDialog','closeDialog','proficiencyTabledate'],
        data(){
            return {
                //对话框是否关闭
                dialogVisible:this.proficiencyDialog,
            }
        },
        watch:{
            proficiencyDialog(){
                this.dialogVisible=this.proficiencyDialog
            }
        },
        methods:{
            close(){
                this.dialogVisible=false
                this.$emit('closeDialog')
            },
            // 更改边框颜色
            cellStyle(){
                return "border-color:#BDE1FC;"
            },
            radio(name,index){
                console.log(this.proficiencyTabledate[index].name)
                if(this.proficiencyTabledate[index].name!=''){
                    this.proficiencyTabledate[index].name=''
                }  
            },
        }
    }
</script>

<style lang="less" scoped>
.title{
    color: #68A0CF;
    i{
        color: #68A0CF;
        padding-right: 0.5714rem;
    }
    background: #F7F7F7;
    height: 2.5714rem;
    display: flex;
    align-items: center;
    padding: 0 1.4286rem;
    border-bottom: 1px solid #dcdcdc;
}
 .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #BDE1FC;
}
 .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #BDE1FC;
}
.table{
    padding-bottom: 1.0714rem;
}
.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    background: #F7F7F7;
    padding: 0.7143rem 0;
    border-top: 1px solid #dcdcdc;
}
.top{
    padding-top:1.0714rem;
    font-size: 1.1429rem;
    font-weight: bold;
}
</style>