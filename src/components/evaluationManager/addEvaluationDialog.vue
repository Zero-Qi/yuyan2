<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="70%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
                <div><span>新增评估细则</span></div>
                <div><i class="el-icon-close" @click="close()"></i></div>
        </div>
        <div class="content">
            <div class="top"><span>细则名称：</span><el-input v-model="input" placeholder="请输入内容"></el-input></div>
             <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="tableDataDialog"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    :row-class-name="margn"
                    >
                    <el-table-column label="关键技术名称" align="center" width="50%">
                        <el-table-column
                        label="TRL"
                        align="center"
                        >
                        <template v-slot="scope">
                            {{scope.$index==0?'TRL':scope.$index}}
                        </template>
                        </el-table-column>
                         <el-table-column
                        align="center"
                        prop='name'
                        >
                        <template v-slot="scope">
                            <span v-if="scope.$index==0"><i class="el-icon-edit-outline" style="padding-right:0.7143rem"></i>{{scope.row.name}}</span>
                            <span v-else>{{scope.row.name}}</span>
                        </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="技术成熟的特征" align="center">
                        <el-table-column
                        align="center"
                        prop='stata'
                        >
                         <template v-slot="scope">
                            <span v-if="scope.$index==0"><i class="el-icon-edit-outline" style="padding-right:0.7143rem"></i>{{scope.row.stata}}</span>
                            <span v-else>{{scope.row.stata}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="center"
                        prop='validation'
                        >
                        <template v-slot="scope">
                            <span v-if="scope.$index==0"><i class="el-icon-edit-outline" style="padding-right:0.7143rem"></i>{{scope.row.validation}}</span>
                            <span v-else>{{scope.row.validation}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        align="center"
                        prop='environment'
                        >
                        <template v-slot="scope">
                            <span v-if="scope.$index==0"><i class="el-icon-edit-outline" style="padding-right:0.7143rem"></i>{{scope.row.environment}}</span>
                            <span v-else>{{scope.row.environment}}</span>
                        </template>
                        </el-table-column>
                    </el-table-column>
                    </el-table>
             </div>
             <div class="bottom">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" label-width="auto">
                    <el-form-item label="TRL1、发现支撑该技术研发的基本原理或看到基本原理的报道:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL2、提出技术概念和应用设想:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item  prop="input" label="TRL3、关键功能和特性完成可行性验证:">
                       <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL4、技术以原理样机或部件为载体,完成实验室环境试验验证:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL5、技术以演示样机或部件为载体,在模拟使用环境下完成试验验证:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL6、分系统级或系统级的中试样机,在模拟使用环境下完成试验验证:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL7、系统级工程样机,在典型使用环境下完成试验验证:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL8、技术应用于预期的核电设施并完成电厂鉴定试验验证:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                    <el-form-item label="TRL9、设施在预期条件下运行成功,各项指标达到要求:" prop="input">
                        <div class="contentBottom">
                            <el-input v-model="ruleForm.input"></el-input>
                            <span><img src="../../assets/img/add.png" alt="" srcset=""></span>
                        </div>
                    </el-form-item>
                </el-form>
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
        props:['addDialog','closeDialog','input','tableDataDialog','ruleForm','rules'],
        data(){
            return {
                dialogVisible:this.addDialog
            }
        },
        watch:{
            addDialog(){
                this.dialogVisible=this.addDialog
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
            margn({row, rowIndex}){
               if(rowIndex==0) return 'a'
            },
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
    border-bottom: 1px solid #EEEEEE;
    justify-content: space-between;
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #BDE1FC;
}
 .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #BDE1FC;
}
.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    background: #fff;
    border-top: 1px solid #EEEEEE;
}
.contentBottom{
    display: flex;
    span{
        display: flex;
        align-items: center;
        padding-left: 0.7143rem;
        img{
        width: 2rem;
        height: 2rem;
        }
    }
}
.top{
    display: flex;
    width: 70%;
    span{
        width: 5.7143rem;
        display: flex;
        align-items: center;
    }
}
.bottom{
    padding-top:1.4286rem;
}
</style>