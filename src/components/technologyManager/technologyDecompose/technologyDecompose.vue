<template>
  <div id="technologydecompose">
    <div class="table">
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
        row-key="id"
        :tree-props="{ children: 'childrenPlan' }"
        :cell-style="cellStyle"
        highlight-current-row
        :header-cell-style="{
          background: '#2B69A6',
          color: '#fff',
          borderColor: '#BDE1FC',
        }"
        tooltip-effect="dark"
        style="width: 100%; margin-top: 0.8571rem"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column align="center" prop="mc" label="名称">
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            {{ formatType(scope.row.jb) }}
          </template>
        </el-table-column>
        <el-table-column prop="yjwcsj" label="简介" align="center">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-show="scope.row.jb !== '0' && scope.row.jb !== '2'"
              style="padding-right: 0.5rem; border-right: 1px solid #f3f3f3"
              @click="editJishu(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              style="padding-right: 0.5rem; border-right: 1px solid #f3f3f3"
              @click="addLowerLevel(scope.row)"
              >添加下级</el-button
            >
            <el-button
              type="text"
              v-show="scope.row.jb !== '0' && scope.row.jb !== '2'"
              style="padding-right: 0.5rem; border-right: 1px solid #f3f3f3"
              @click="lookJishu(scope.row)"
              >详情</el-button
            >
            <el-button type="text" style="padding-right: 0.5rem" v-show="scope.row.jb !== '0'" @click="deleteJishu(scope.row)"
              >删除</el-button
            >
            <!-- <template v-else>
              <el-button
                type="text"
                style="padding-right: 0.5rem"
                @click="addLowerLevel"
                >添加下级</el-button
              >
            </template> -->
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
        :total="pageInfo.pageTotal"
      >
      </el-pagination>
    </div>
    <!-- <addLevelDialog
      :isDialog="isDialog"
      @closeDialog="closeDialog"
      :form.sync="form"
      :options.sync="options"
    ></addLevelDialog> -->
    <!-- 新增领域弹框 -->
    <el-dialog
      :visible.sync="lingyuDialogVisible"
      width="50%"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div slot="title" class="title">
        <div><span>新增领域</span></div>
        <div><i class="el-icon-close" @click="lingyuDialogVisible = false"></i></div>
      </div>
      <div class="content">
        <el-form
          ref="form1"
          :model="form1"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="领域名称：">
            <el-input
              v-model="form1.mc"
              placeholder="请输入领域名称"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="合同乙方：">
            <el-input
              v-model="form1.kssj"
              placeholder="请输入合同乙方"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="领域简介：">
            <el-input
              type="textarea"
              v-model="form1.yjwcsj"
              placeholder="请输入领域简介"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="close()">取消</el-button>
          <el-button @click="xinzengLingyu" class="generalButton">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 领域编辑弹框 -->
    <el-dialog
    title="领域编辑"
    :visible.sync="bjlydialogTableVisible"
    :close-on-click-modal="false"
    width="50%"
    >
    <div>
      <el-form
          ref="bianjiform"
          :model="bianjiform"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="领域名称：">
            <el-input
              v-model="bianjiform.mc"
              placeholder="请输入领域名称"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="合同乙方：">
            <el-input
              v-model="bianjiform.kssj"
              placeholder="请输入合同乙方"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="领域简介：">
            <el-input
              type="textarea"
              v-model="bianjiform.yjwcsj"
              placeholder="请输入领域简介"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="bjlydialogTableVisible = false">取消</el-button>
          <el-button @click="bianjiLingyu" class="generalButton">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 查看领域详情 -->
    <el-dialog
    title="领域详情"
    :visible.sync="lyxqdialogTableVisible"
    :close-on-click-modal="false"
    width="50%"
    >
    <div>
      <el-form
          ref="lyxqform"
          :model="lyxqform"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="领域名称：">
            <el-input
              v-model="lyxqform.mc"
              placeholder="请输入领域名称"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="合同乙方：">
            <el-input
              v-model="lyxqform.kssj"
              placeholder="请输入合同乙方"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="领域简介：">
            <el-input
              type="textarea"
              v-model="lyxqform.yjwcsj"
              placeholder="请输入领域简介"
              disabled
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="lyxqdialogTableVisible = false">取消</el-button>
          <!-- <el-button @click="bianjiLingyu" class="generalButton">确定</el-button> -->
        </div>
      </span>
    </el-dialog>
    <!-- 新增专题弹框 -->
    <el-dialog
      :visible.sync="zhuantiDialogVisible"
      width="50%"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div slot="title" class="title">
        <div><span>新增专题</span></div>
        <div><i class="el-icon-close" @click="zhuantiDialogVisible = false"></i></div>
      </div>
      <div class="content">
        <el-form
          ref="zhuantiform"
          :model="zhuantiForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="专题名称：">
            <el-input
              v-model="zhuantiForm.mc"
              placeholder="请输入专题名称"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="合同乙方：">
            <el-input
              v-model="zhuantiForm.kssj"
              placeholder="请输入合同乙方"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="专题简介：">
            <el-input
              type="textarea"
              v-model="zhuantiForm.yjwcsj"
              placeholder="请输入专题简介"
              :rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <div class="contentButton">
          <el-button @click="zhuantiDialogVisible = false">取消</el-button>
          <el-button @click="xinzengZhuanti" class="generalButton">确定</el-button>
        </div>
      </span>
    </el-dialog>
    <!-- 新增技术弹框 -->
    <el-dialog
        :visible.sync="jishuDialogVisible"
        width="50%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
            <div><span>新增技术</span></div>
            <div><i class="el-icon-close" @click="jishuDialogVisible = false"></i></div>
        </div>
        <div class="content">
            <el-form ref="jishuform" :model="jishuForm" label-width="120px" class="demo-ruleForm">
                <!-- <el-form-item label="关联领域：">
                <span>{{}}</span>
                </el-form-item> -->
                <el-form-item label="关联专题：">
                <span>{{guanlianZhuanti}}</span>
                </el-form-item>
                <el-form-item label="技术名称：">
                    <el-input
                        v-model="jishuForm.mc"
                        placeholder="请输入技术名称"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="研究周期：">
                    <el-date-picker
                        v-model="jishuForm.sjwcsjqq"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同乙方：">
                    <el-input
                        v-model="jishuForm.kssj"
                        placeholder="请输入合同乙方"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input
                        v-model="jishuForm.zrdw"
                        placeholder="请输入负责人"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input
                        v-model="jishuForm.xlfs"
                        placeholder="请输入联系方式"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="研究目标：">
                    <el-input placeholder="请输入研究目标" v-model="jishuForm.wczt" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="主要研究内容：">
                    <el-input type="textarea" v-model="jishuForm.cgxs" :rows="3" placeholder="请输入主要研究内容"></el-input>
                </el-form-item>
                <el-form-item label="技术难点：">
                    <el-input type="textarea" v-model="jishuForm.jsnd" :rows="3" placeholder="请输入技术难点"></el-input>
                </el-form-item>
                <el-form-item label="标志性成果：">
                    <el-input type="textarea" v-model="jishuForm.bzxcg" :rows="3" placeholder="请输入标志性成果"></el-input>
                </el-form-item>
                <!-- <template v-for="(item,index) in form.type" >
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
                </template> -->
            </el-form>
        </div>
       
        <span slot="footer" class="dialog-footer">
             <div class="contentButton">
                <el-button @click="jishuDialogVisible = false">取消</el-button>
                <el-button @click="xinzengjishu()" class="generalButton">确定</el-button>
            </div>
        </span>
    </el-dialog>
    <!-- 技术编辑弹框 -->
    <el-dialog
        :visible.sync="jsbjDialogVisible"
        width="50%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
            <div><span>技术编辑</span></div>
            <div><i class="el-icon-close" @click="jsbjDialogVisible = false"></i></div>
        </div>
        <div class="content">
            <el-form ref="jishubjform" :model="jishubjform" label-width="120px" class="demo-ruleForm">
                <!-- <el-form-item label="关联领域：">
                <span>{{}}</span>
                </el-form-item> -->
                <el-form-item label="关联专题：">
                <span>{{guanlianZhuanti}}</span>
                </el-form-item>
                <el-form-item label="技术名称：">
                    <el-input
                        v-model="jishubjform.mc"
                        placeholder="请输入技术名称"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="研究周期：">
                    <el-date-picker
                        v-model="jishubjform.sjwcsjqq"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同乙方：">
                    <el-input
                        v-model="jishubjform.kssj"
                        placeholder="请输入合同乙方"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input
                        v-model="jishubjform.zrdw"
                        placeholder="请输入负责人"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input
                        v-model="jishubjform.xlfs"
                        placeholder="请输入联系方式"
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="研究目标：">
                    <el-input placeholder="请输入研究目标" v-model="jishubjform.wczt" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="主要研究内容：">
                    <el-input type="textarea" v-model="jishubjform.cgxs" :rows="3" placeholder="请输入主要研究内容"></el-input>
                </el-form-item>
                <el-form-item label="技术难点：">
                    <el-input type="textarea" v-model="jishubjform.jsnd" :rows="3" placeholder="请输入技术难点"></el-input>
                </el-form-item>
                <el-form-item label="标志性成果：">
                    <el-input type="textarea" v-model="jishubjform.bzxcg" :rows="3" placeholder="请输入标志性成果"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
             <div class="contentButton">
                <el-button @click="close()">取消</el-button>
                <el-button @click="bianjiJishu()" class="generalButton">确定</el-button>
            </div>
        </span>
    </el-dialog>
    <!-- 查看技术详情 -->
    <el-dialog
        :visible.sync="jsxqDialogVisible"
        width="50%"
        :close-on-press-escape="false"
        :show-close="false"
        >
        <div slot="title" class="title">
            <div><span>技术详情</span></div>
            <div><i class="el-icon-close" @click="jsxqDialogVisible = false"></i></div>
        </div>
        <div class="content">
            <el-form ref="jishuxqform" :model="jishuxqform" label-width="120px" class="demo-ruleForm">
                <!-- <el-form-item label="关联领域：">
                <span>{{}}</span>
                </el-form-item> -->
                <!-- <el-form-item label="关联专题：">
                <span>{{guanlianZhuanti}}</span>
                </el-form-item> -->
                <el-form-item label="技术名称：">
                    <el-input
                        v-model="jishuxqform.mc"
                        placeholder="请输入技术名称"
                        disabled
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="研究周期：">
                    <el-date-picker
                        v-model="jishuxqform.sjwcsjqq"
                        disabled
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同乙方：">
                    <el-input
                        v-model="jishuxqform.kssj"
                        placeholder="请输入合同乙方"
                        disabled
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="负责人：">
                    <el-input
                        v-model="jishuxqform.zrdw"
                        placeholder="请输入负责人"
                        disabled
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <el-input
                        v-model="jishuxqform.xlfs"
                        placeholder="请输入联系方式"
                        disabled
                        :rows="3"
                    ></el-input>
                </el-form-item>
                <el-form-item label="研究目标：">
                    <el-input placeholder="请输入研究目标" disabled v-model="jishuxqform.wczt" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="主要研究内容：">
                    <el-input type="textarea" v-model="jishuxqform.cgxs" disabled :rows="3" placeholder="请输入主要研究内容"></el-input>
                </el-form-item>
                <el-form-item label="技术难点：">
                    <el-input type="textarea" v-model="jishuxqform.jsnd" disabled :rows="3" placeholder="请输入技术难点"></el-input>
                </el-form-item>
                <el-form-item label="标志性成果：">
                    <el-input type="textarea" v-model="jishuxqform.bzxcg" disabled :rows="3" placeholder="请输入标志性成果"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
             <div class="contentButton">
                <el-button @click="jsxqDialogVisible = false">取消</el-button>
                <!-- <el-button @click="xinzengjishu()" class="generalButton">确定</el-button> -->
            </div>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import addLevelDialog from "./addLevelDialog";
import { getjssgl, addLingyu, addZhuanti, addJishu, editLingyu, editJishu } from "../../../api/jssgl";
export default {
  components: {
    addLevelDialog,
  },
  data() {
    return {
      //是否打开对话框
      isDialog: false,
      title: '',
      lingyuDialogVisible: false,
      bjlydialogTableVisible: false,
      zhuantiDialogVisible: false,
      jishuDialogVisible: false,
      jsbjDialogVisible: false,
      lyxqdialogTableVisible: false,
      jsxqDialogVisible: false,
      dialogVisible: false,
      // 选中表格多少跳
      selectData: [],
      // 经费管理对话框是否显示
      isDialog: false,
      // 分页
      pageInfo: {
        currentPage: 1,
        pageTotal: 0,
        pageSize: 10,
      },
      // 表单
      searchFrom: {
        name: "",
        time: [],
      },
      // 表格
      tableData: [
        // {
        //   id: 1,
        //   date: "2016-05-02",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   children: [],
        // },
        // {
        //   id: 2,
        //   date: "2016-05-04",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   children: [],
        // },
        // {
        //   id: 3,
        //   date: "2016-05-01",
        //   name: "王小虎",
        //   address: "上海市普陀区金沙江路 1519 弄",
        //   children: [
        //     {
        //       id: 31,
        //       date: "2016-05-01",
        //       name: "a",
        //       address: "上海市普陀区金沙江路 1519 弄",
        //       pid: 3,
        //     },
        //     {
        //       id: 32,
        //       date: "2016-05-01",
        //       name: "a",
        //       address: "上海市普陀区金沙江路 1519 弄",
        //       pid: 3,
        //       children: [
        //         {
        //           id: 333,
        //           date: "2016-05-01",
        //           name: "a",
        //           address: "上海市普陀区金沙江路 1519 弄",
        //           pid: 32,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   id: 4,
        //   date: "2016-05-03",
        //   name: "c",
        //   address: "上海市普陀区金沙江路 1516 弄",
        //   children: [],
        // },
        // {
        //   id: 5,
        //   date: "2016-05-04",
        //   name: "d",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   children: [],
        // },
        // {
        //   id: 6,
        //   date: "2016-05-04",
        //   name: "e",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   children: [],
        // },
        // {
        //   id: 7,
        //   date: "2016-05-04",
        //   name: "f",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   children: [],
        // },
        // {
        //   id: 8,
        //   date: "2016-05-04",
        //   name: "g",
        //   address: "上海市普陀区金沙江路 1517 弄",
        //   children: [],
        // },
      ],
      // 表单
      form: {
        region: "",
        researchObject: "",
        researchContents: "",
        difficulties: "",
        Signature: "",
        type: [
          {
            indexName: "",
            indexValue: "",
          },
        ],
      },
      form1: {
        jb: '1',
        // 创建人
        cjr: 'admin',
        // 更新人
        gxr: 'admin',
        xlzt: '1'
      },
      bianjiform: {},
      lyxqform: {},
      zhuantiForm: {
        jb: '2',
        cjr: 'admin',
        gxr: 'admin',
        xlzt: '1'
      },
      jishuForm: {
        jb: '3',
        cjr: 'admin',
        gxr: 'admin',
        xlzt: '1',
        sjwcsj: ''
      },
      jishubjform: {
        sjwcsjqq: []
      },
      jishuxqform: {
        sjwcsjqq: []
      },
      // 关联专题
      guanlianZhuanti: '',
      // 多选
    //   options: [
    //     {
    //       value: "选项1",
    //       label: "黄金糕",
    //     },
    //     {
    //       value: "选项2",
    //       label: "双皮奶",
    //     },
    //     {
    //       value: "选项3",
    //       label: "蚵仔煎",
    //     },
    //     {
    //       value: "选项4",
    //       label: "龙须面",
    //     },
    //     {
    //       value: "选项5",
    //       label: "北京烤鸭",
    //     },
    //   ],
    };
  },
  methods: {
    //关闭对话框
    closeDialog() {
      this.isDialog = false;
    },
    // 添加下级弹框
    addLowerLevel(level) {
        console.log(level, '数据');
      if (level.jb === '0') {
        // 新增领域
        this.lingyuDialogVisible = true
        // this.form2 = level
        this.form1['sjid'] = level.id
      } else if (level.jb === '1') {
        // 打开新增专题弹框
        this.zhuantiDialogVisible = true
        this.zhuantiForm['sjid'] = level.id
      } else if (level.jb === '2') {
        // 打开新增技术弹框
        this.jishuDialogVisible = true
        this.jishuForm['sjid'] = level.id
        this.guanlianZhuanti = level.mc
      }
    },
    // 编辑弹框
    editJishu(data) {
        console.log(data, '++++');
        // 编辑领域
        if (data.jb === '1') {
          this.bjlydialogTableVisible = true
          this.bianjiform = JSON.parse(JSON.stringify(data))
        } else if (data.jb === '3') {
          // 编辑技术
          this.jsbjDialogVisible = true
          const str1  = data.sjwcsj.substring(0,10)
          const str2  = data.sjwcsj.substring(11)
          this.jishubjform = data
          // console.log(str1, '___))))');
          // console.log(str2, '___))))');
          var arrayObj = new Array()
          arrayObj.push(str1, str2)
          this.$set(this.jishubjform, 'sjwcsjqq', arrayObj)
        }
    },
    // 查看详情
    lookJishu(data) {
        console.log(data, '__+++')
        // 查看领域详情
        if (data.jb === '1') {
          this.lyxqdialogTableVisible = true
          this.lyxqform = data
        } else if (data.jb === '3') {
          this.jsxqDialogVisible = true
          this.jishuxqform = data
          const string1  = data.sjwcsj.substring(0,10)
          const string2  = data.sjwcsj.substring(11)
          // console.log(string1, '----8');
          // console.log(string2, '----3');
          this.jishuxqform.sjwcsjqq = []
          this.jishuxqform.sjwcsjqq[0] = string1
          this.jishuxqform.sjwcsjqq[1] = string2
        }
    },
    // 新增领域
    xinzengLingyu() {
        console.log('2345678');
        this.$refs['form1'].validate((valid) => {
            console.log(this.form1, '*****');
            if (valid) {
                addLingyu(this.form1).then(res => {
                    console.log(res, '添加成功');
                    this.$message.success('添加成功！')
                    this.lingyuDialogVisible = false
                    this.jssgl()
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    },
    // 编辑领域
    bianjiLingyu() {
      editLingyu(this.bianjiform.id, this.bianjiform).then(res => {
        console.log(res, '编辑成功')
        this.bjlydialogTableVisible = false
        this.jssgl()
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增专题
    xinzengZhuanti() {
        this.$refs['zhuantiform'].validate((valid) => {
            console.log(this.zhuantiForm, '*****');
            if (valid) {
                addZhuanti(this.zhuantiForm).then(res => {
                    console.log(res, '添加成功');
                    this.$message.success('添加成功！')
                    this.zhuantiDialogVisible = false
                    this.$refs['zhuantiform'].resetFields()
                    this.jssgl()
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    },
    // 新增技术
    xinzengjishu() {
        this.$refs['jishuform'].validate((valid) => {
            if (valid) {
                this.jishuForm.sjwcsj = this.jishuForm.sjwcsjqq.join('-')
                addJishu(this.jishuForm).then(res => {
                    // console.log(res, '添加成功');
                    this.$message.success('添加成功！')
                    this.jishuDialogVisible = false
                    this.jssgl()
                }).catch(err => {
                    console.log(err)
                })
            }
        })
    },
    // 编辑技术
    bianjiJishu() {
      this.$refs['jishubjform'].validate((valid) => {
        if (valid) {
          this.jishubjform.sjwcsj = this.jishubjform.sjwcsjqq.join('-')
          editJishu(this.jishubjform.id, this.jishubjform).then(res => {
            // console.log(res, '编辑技术成功')
            this.$message.success('编辑成功！')
            this.jsbjDialogVisible = false
            this.jssgl()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    // 删除操作
    deleteJishu(data) {
      // 领域删除
      if (data.jb === '1') {
        editLingyu(data.id, {xlzt: '0'}).then(res => { 
          console.log(res, '删除成功！')
          this.$message.success('删除成功！')
          this.jssgl()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 清除选中项
    clear() {
      (this.selectData = []), this.$refs.multipleTable.clearSelection();
    },
    // 是否关闭经费管理对话框
    closeDialog() {
      this.isDialog = false;
    },
    close() {},
    // 详情按钮
    managementBtn() {
      this.isDialog = true;
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    // 更改边框颜色
    cellStyle() {
      return "border-color:#BDE1FC;";
    },
    // 页数总数改变
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
    },
    // 获取技术分解数据
    jssgl() {
      getjssgl({xlzt: '1'}).then((res) => {
        console.log(res, "技术分解数据");
        this.tableData = res.data;
      });
    },
    // 数据类型
    formatType(status) {
      const statusObj = {
        0: "工程",
        1: "领域",
        2: "专题",
        3: "技术",
        4: "子技术",
      };
      return statusObj[status];
    },
  },
  mounted() {
    this.jssgl();
  },
};
</script>

<style lang="less" scoped>
#technologydecompose {
  background: #fff;
  color: #000;
  padding: 1.4286rem;
}
.el-table td,
.el-table th.is-leaf,
.el-table--border,
.el-table--group {
  border-color: #bde1fc;
}
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: #bde1fc;
}

.pagination {
  padding-top: 0.7143rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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
</style>