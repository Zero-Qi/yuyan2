<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
                <div><span>新增</span></div>
                <div><i class="el-icon-close" @click="close()"></i></div>
        </div>
        <div class="content">
            <el-form ref="form" :model="form" label-width="120px" class="demo-ruleForm">
                <el-form-item label="关联领域：">
                <span>xxxx</span>
                </el-form-item>
                <el-form-item label="技术名称：">
                    <el-select v-model="form.region" placeholder="请选择" class="select">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="研究目标：">
                    <el-input type="textarea" v-model="form.researchObject" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="主要研究内容：">
                    <el-input type="textarea" v-model="form.researchContents" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="技术难点：">
                    <el-input type="textarea" v-model="form.difficulties" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="标志性成果：">
                    <el-input type="textarea" v-model="form.Signature" :rows="3"></el-input>
                </el-form-item>
                <template v-for="(item,index) in form.type" >
                    <el-form-item label="指标名称：" :key="index">
                        <div class="left">
                                <el-input clearable type="input" v-model="item.indexName" :rows="3"></el-input>
                                <span :class="index?'img':'img1'"><img src="../../../assets/img/add.png" alt="" srcset="" @click="addIndicators"></span>
                                <span class="img" v-if="index"><img src="../../../assets/img/delete.png" alt="" srcset="" @click="delIndicators(index)"></span>
                               
                        </div>
                        <div  class="right">
                            <span>指标参数：</span><el-input type="input" clearable v-model="item.indexValue" :rows="3"></el-input>
                        </div> 
                    </el-form-item>
                </template>
            </el-form>
        </div>
       
        <span slot="footer" class="dialog-footer">
             <div class="contentButton">
                <el-button @click="close()">取消</el-button>
                <el-button @click="close()" class="generalButton">确定</el-button>
            </div>
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['isDialog','closeDialog','form','options'],
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
            addIndicators(){
                this.form.type.push(
                    {
                            indexName:'',
                            indexValue:''
                    },
                )
            },
            delIndicators(index){
                this.form.type.splice(index,1)
            }
        }
    }
</script>

<style lang="less" scoped>
.demo-ruleForm{
    color: #000;
    font-weight: bold;
    font-family: '微软雅黑';
}
.demo-ruleForm span{
    color: #000;
    font-family: '微软雅黑';
    font-weight: normal;
}
.select{
    width: 100%;
}
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

.dialog-footer{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.5rem;
    background: #fff;
    border-top: 1px solid #EEEEEE;
}
.left{
    display: flex;
    .img{
        display: flex;
        align-items: center;
        padding-left: 0.7143rem;
    }
    span img{
    width: 2rem;
    height: 2rem;
    }
    .img1{
         display: flex;
        align-items: center;
        padding-left: 0.7143rem;
        padding-right: 2.7143rem;
    }
}
.right{
    display: flex;
    padding-top: 0.7143rem;
    padding-right: 5.4286rem;
    span{
        color: #606266;
        font-weight: bold;
        font-family: '微软雅黑';
        width:7.1429rem;
    }
}
</style>