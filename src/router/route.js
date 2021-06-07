import Vue from 'vue';
import VueRouter from 'vue-router'
import Index from '../views/user'
import Login from '../views/login'
Vue.use(VueRouter)

let routes=[
    {
        path: '/',
        redirect: {
            name: 'login'
        }
     }, {
        path: '/login',
        name: 'login',
        component: Login
     },
      {
        path:'/index',
        name:'index',
        component: Index,
        children: [
          {
            path: '/index',
            name: '首页',
            component: () => import('components/index'),
          },{
          path:'/planMgent',
          name:'计划管理',
          component: () => import('components/projectManager/projectPlan/planMgent.vue'),
          },
          {
            path: '/projectplan', 
            name: '工程计划',
            component: () => import('components/projectManager/projectPlan/projectPlan.vue'),
          },
          {
            path: '/projectcontract',
            name: '课题合同',
            component: () => import('components/projectManager/projectContract/projectContract.vue'),
          },
          {
            path: '/technocracy',
            name: '专家管理',
            component: () => import('components/projectManager/technocracy/technocracy.vue'),
          },
          {
            path: '/fileManager',
            name: '过程文件管理',
            component: () => import('components/projectManager/fileManager/fileManager.vue'),
          },
          {
            path: '/technologydecompose',
            name: '技术分解',
            component: () => import('components/technologyManager/technologyDecompose/technologyDecompose.vue')
          },
          {
            path: '/technology',
            name: '关键技术管理',
            component: () => import('components/technologyManager/technology/technology.vue')
            
          },
          {
            path: '/criticaldegree',
            name: '关键程度评估',
            component: () => import('components/technologyManager/technology/criticaldegree.vue')
          },
          {
            path: '/startAssess',
            name: '开始评估',
            component: () => import('components/TechnologyMaturityAssessment/step1.vue'),
          },
          {
            path: '/assessManagement',
            name: '评估任务管理',
            component: () => import('components/TechnologyMaturityAssessment/evaluationTasks.vue'),
          },
          {
            path: '/riskAssessment',
            name: '技术风险评价',
            component: () => import('components/TechnologyRiskAssessment/risk1.vue'),
          },
          {
            path: '/riskpg',
            name: 'riskpg',
            component: () => import('components/TechnologyRiskAssessment/evaluationTasks.vue'),
          },
          {
            path: '/risk2',
            name: 'risk2',
            component: () => import('components/TechnologyRiskAssessment/risk2.vue'),
          },{
            path: '/risk3',
            name: 'risk3',
            component: () => import('components/TechnologyRiskAssessment/risk3.vue'),
          },{
            path: '/risk4',
            name: 'risk4',
            component: () => import('components/TechnologyRiskAssessment/risk4.vue'),
          },
          {
            path: '/step2',
            name: '步骤二',
            component: () => import('components/TechnologyMaturityAssessment/step2.vue'),
          },{
            path: '/step3',
            name: '步骤三',
            component: () => import('components/TechnologyMaturityAssessment/step3.vue'),
          },{
            path: '/step4',
            name: '步骤四',
            component: () => import('components/TechnologyMaturityAssessment/step4.vue'),
          },
          {
            path: '/engineering',
            name: '工程信息评估面板',
            component: () => import('components/ComprehensiveInformation/engineeringInformation.vue'),
          },
          {
            path: '/evaluation',
            name: '评估信息评估面板',
            component: () => import('components/ComprehensiveInformation/evaluationInformation.vue'),
          },
          {
            path: '/zhuanjiaguanli',
            name: '专家管理',
            component: () => import('components/basicInformationmanage/zhuanjiaManage.vue'),
          },
        ]
      }
];
export default routes