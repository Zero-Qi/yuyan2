<template>
    <div>
        <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
            <span><i class="el-icon-date"></i>工程计划详情</span>
        </div>
        <div class="content">
            <div class="contentLeft">
                <span>计划名称：</span> 
                <span>开始时间：</span> 
                <span>所属课题：</span> 
                <span>是否里程碑：</span> 
                <span>附件：</span> 
            </div>
            <div class="contentRight">
                <span>计划负责人：</span> 
                <span>完成时间：</span> 
                <span>工期：</span> 
                <span>完成状态：</span> 
            </div>
        </div>
        <div class="contentButton">
            <el-button @click="close()">关闭</el-button>
        </div>
        <span slot="footer" class="dialog-footer">
        </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props:['isDialog','closeDialog'],
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
.content{
    display: flex;
    // flex-direction: column;
    justify-content: space-around;
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
    height: 2.5rem;
    background: #F7F7F7;
    border-top: 1px solid #dcdcdc;
}
</style>