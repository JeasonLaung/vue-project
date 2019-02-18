import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import About from './views/About.vue';
import Index from './views/Index.vue';

import UserMain from './views/UserMain/index.vue';

import Company from './views/Company.vue';
import College from './views/College.vue';

import JobDetail from './views/JobDetail/index.vue'
import CollegeDetail from './views/CollegeDetail/index.vue'
import CollegeHome from './views/CollegeDetail/CollegeHome.vue';
import CollegeStudents from './views/CollegeDetail/CollegeStudents.vue';
import CompanyDetail from './views/CompanyDetail/Index.vue';
import CompanyHome from './views/CompanyDetail/CompanyHome.vue';
import CompanyJobs from './views/CompanyDetail/CompanyJobs.vue';
import CompanyQuestion from './views/CompanyDetail/CompanyQuestion.vue';

import Search from '@/views/Search/index.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  // mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    //   {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/test',
      component: About,
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/company/:id',
      // name: 'company_detail', 
      component: CompanyDetail,
      meta: {
        keepAlive: true // 需要缓存
      },
      children:[
        {
          path: '',
          name:'company_home',
          component: CompanyHome,
        },
        {
          path: 'jobs',
          name:'company_jobs',
          component: CompanyJobs,
        },
        {
          path: 'question',
          name:'company_question',
          component: CompanyQuestion,
        },
      ]
    },
    {
      path: '/company',
      name: 'company',
      component: Company,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/college',
      name: 'college',
      component: College,
      meta: {
        keepAlive: true // 需要缓存
      }
    },
    {
      path: '/job/:id',
      name: 'job_detail',
      component: JobDetail,
    },
    {
      path: '/search',
      name: 'search',
      component:Search,
      children:[
        {
          path:'company',
          name:'search_company',

        },
        {
          path:'job',
          name:'search_job',
        }
      ]
    },/*/search*/
    {
      path: '/college/:id',
      component: CollegeDetail,
      children:[
        {
          path:'',
          name:'college_detail',
          component: CollegeHome,          
        },
        {
          path:'students',
          name:'college_students',
          component: CollegeStudents,
        }
      ]
    },/*college_detail*/
    // {
    //   path: '/me',
    //   component: UserMain,
    // },/*userMain*/

  ],

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});
