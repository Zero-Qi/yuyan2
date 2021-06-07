<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="70%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
            <span><i class="el-icon-date"></i>关键程度选择</span>
        </div>
        <div class="content">
            <div class="top">
                <span>重要性检查</span>
                <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="tableDataDialog.one"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                        <el-table-column
                        align="center"
                        >
                            <template v-slot="scope">
                                <el-radio v-model="tableDataDialog.Oneradio" :label="scope.$index" @click="radioChange(1)">{{&nbsp;}}</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="project"
                        label="项目" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="category"
                        label="类别" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="level"
                        label="等级" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="名称" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="standard"
                        label="标准" align="center"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="top">
                <span>困难度评价</span>
                <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="tableDataDialog.two"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                        <el-table-column
                        align="center"
                        >
                            <template v-slot="scope">
                                <el-radio v-model="tableDataDialog.Tworadio" :label="scope.$index" @click="radioChange(2)">{{&nbsp;}}</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="project"
                        label="项目" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="category"
                        label="类别" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="level"
                        label="等级" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="名称" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="standard"
                        label="标准" align="center"
                        >
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="tableDataDialog.three"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                        <el-table-column
                        align="center"
                        >
                            <template v-slot="scope">
                                <el-radio v-model="tableDataDialog.threeradio" :label="scope.$index" @click="radioChange(3)">{{&nbsp;}}</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="project"
                        label="项目" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="category"
                        label="类别" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="level"
                        label="等级" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="名称" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="standard"
                        label="标准" align="center"
                        >
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table">
                    <el-table
                    ref="multipleTable"
                    :data="tableDataDialog.four"
                    border
                    :cell-style="cellStyle"
                    highlight-current-row
                    :header-cell-style="{background:'#2B69A6',color:'#fff',borderColor: '#BDE1FC'}"
                    tooltip-effect="dark"
                    style="width:100%;margin-top:0.8571rem"
                    >
                        <el-table-column
                        align="center"
                        >
                            <template v-slot="scope">
                                <el-radio v-model="tableDataDialog.fourradio" :label="scope.$index" @click="radioChange(4)">{{&nbsp;}}</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="project"
                        label="项目" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="category"
                        label="类别" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="level"
                        label="等级" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="名称" align="center"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="standard"
                        label="标准" align="center"
                        >
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="bottom">
                    <span>评价理由:</span>
                    <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="tableDataDialog.a">
                    </el-input>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
             <el-button @click="close()" class="generalButton">提交</el-button>
              <el-button @click="close()">取消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['isDialog','closeDialog','tableDataDialog'],
        data(){
            return {
                dialogVisible:this.isDialog
            }
        },
        watch:{
            isDialog(){
                this.dialogVisible=this.isDialog
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
            // 选了哪一个
            radioChange(id,newCurrentRow){
                console.log(id,newCurrentRow)
                if(id==1)this.tableDataDialog.Oneradio = newCurrentRow; // 控制单选框选中
                else if(id==2)this.tableDataDialog.Tworadio = newCurrentRow
                else if(id==3)this.tableDataDialog.threeradio = newCurrentRow
                else if(id==4)this.tableDataDialog.fourradio = newCurrentRow
            }
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
.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
    background: #F7F7F7;
    border-top: 1px solid #dcdcdc;
    padding: 0.3572rem;
}
.content{
    padding: 0 2rem 2rem 2rem;
}
.top{
    padding-bottom: 1.2857rem;
    span{
        color: #8BAFCD;
        padding-bottom: 0.7143rem;
        border-bottom: 2px solid #9EBCD6;
    }
    .table{
        padding-top: 0.7143rem;
    }
}
.el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
    border-color: #BDE1FC;
}
 .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #BDE1FC;
}
.bottom{
    display: flex;
    span{
        width: 80.0006px;
        display: flex;
    }
}
</style>