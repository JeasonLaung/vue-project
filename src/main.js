import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css/animate.min.css';
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';/*2019-2-11 增加权限路由*/
/*权限管理*/
// console.log(router)
// router.beforeEach((to,from,next)=>{
// 	console.log(router)
	// setTimeout(()=>{
	// 	console.log(store.getters.user_info)
	// },1000)
	
	// console.log(store.state)
	// console.log(b)
	// console.log(c)
// })
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   // if (to.meta.title) {
//   //   document.title = to.meta.title
//   // }
//   console.log(from)
//   console.log(to)
//   // const permission = require('./permission/student.js')
//   // console.log(permission)
//   if (/^\/my/.test(to.path)) {
//     if(store.state.USER_INFO != null){
//       let role = store.state.USER_INFO['role']
//       if (role) {

//       }
//     }
//   }
//   next()
  
// })

// import UserMain from "@/views/UserMain/index.vue"
// router.addRoutes([
//     {
//       path: '/me',
//       component: ()=>import("@/views/UserMain/index.vue"),
//     },/*userMain*/
// ])



//2019-01-27重写axios
import axios from '@/requests/axios';
Vue.prototype.$ajax = axios;

//2019-01-29添加原型文件
import './prototype'

Vue.config.productionTip = false;

Vue.use(ElementUI);

import components from '@/components'
Object.keys(components).forEach((key)=>{
  Vue.component(key,components[key])
})
import util from '@/util'
Object.keys(util).forEach((key)=>{
	Vue.prototype[key] = util[key];
})


// let env = process.env.NODE_ENV
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
