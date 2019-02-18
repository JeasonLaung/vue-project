//依赖Axios
import axios from '@/requests/axios'
//依赖Vuex
import store from '@/store.js'
//路由处理
import router from '@/router.js'

// const validate = require('./validate.js')

import socket from '@/requests/websocket.js'
import cookies from '@/util/cookie.js'

class user{
	/*用户本身*/
	role = ''
	#sessionName = 'user_info'
	#storeName = 'USER_INFO'

	/*websocket*/
	#WS = 'ws://jeason.xyz/msn'
	#WSStoreName = 'WS'

	/*权限路由加载*/
	#permission_router = []
	constructor(){
		// console.log(store.state.USER_INFO)
		// router.addRoutes([{
		// 	path:'/my',
		// 	name:'my',
		// 	component:()=>import("@/views/UserMain/index.vue")
		// }])
	}


	login(data){
		// {username:123456,password:123456}
		return new Promise((resolve,reject)=>{
			axios({
				method:'post',
				url:'/api/user/login',
				data:data
			}).then(data=>{
				/*登录成功*/
				resolve(data.data)
				/*连接websocket*/
				this.connectSocket()


				/*设置info*/
				this.setInfo(data.data)
			}).catch(e=>{
				reject(e)
			})
		})
	}
	register(data){
		// {email:123456,code:123456,role:company}
		let role = data['role'];
		return new Promise((resolve,reject)=>{
			axios({
				method:'post',
				url:`/api/${role}/register`,
				data:data,
			}).then(data=>{
				//注册成功
				this.setInfo(data.data.data)
				resolve(data)
			}).catch(e=>{
				reject(e)
			})
		})
	}

	refreshInfo(){
		return new Promise((resolve,reject)=>{

			axios({
				method:'get',
				url:'/api/get_user_info',
			}).then(data=>{
				//获取成功
				this.setInfo(data.data)
				this.role = data.data.role
				//导入权限路由
				let permission = require('@/permission/'+this.role+'.js')
				router.addRoutes(permission.router)
				router.addRoutes([
					{
				      path:'*',
				      component:()=>import('@/views/NotFound.vue'),
				    }
				]);
				store.USER_MENU = permission.nav
				store.USER_NAVBAR = permission.navbar
				// console.log(store.USER_NAVBAR)

				/*连接websocket*/
				this.connectSocket()
				resolve(data.data)
			}).catch(e=>{
				this.clearInfo()
				router.addRoutes([
					{
				      path:'*',
				      component:()=>import('@/views/NotFound.vue'),
				    }
				]);
				// reject(e)
			})
		})
	}


	getInfo(){
		// if (null === store.state.USER_INFO){
		// 	return false;
		// }
		let session_u_info = sessionStorage.getItem(this.#sessionName);
		let store_u_info = store.state[this.#storeName];
		if (null !== session_u_info && false != session_u_info) {
			let info = JSON.parse(session_u_info);
			if (null !== store_u_info && false != store_u_info) {
				this.setInfo(info);
			}
			return info;
			
		}
		if (null !== store_u_info && false != store_u_info) {
			return store_u_info;
		}
		return false
		// return store.state[this.#storeName];
	}

	setInfo(info){
		let session_u_info = sessionStorage.getItem(this.#sessionName);
		store.state[this.#storeName] = info;
		
		//存一份在sessionStorage
		if (null !== session_u_info && false != session_u_info) {
			sessionStorage.setItem(this.#sessionName,JSON.stringify(info))
		}
	}

	clearInfo(){
		store.state[this.#storeName] = null;
		sessionStorage.removeItem(this.#sessionName)
	}

	update(data){
		for(var i in data){
			store.state[this.#storeName][i] = data[i]
		}
	}
	// set(key,value){
	// 	if (false === getInfo) {
	// 		return false
	// 	}
	// 	store.state.USER_INFO[key] = value
	// }

	get(key){
		let value = store.state.USER_INFO[key];
		return value == null ? '' : value;
	}


	connectSocket(){
		/*ws*/
		let ws = new socket({url:this.#WS,heartBeat:50000})
		
		/*发送登录消息*/
		ws.onopen(function() {
			let token = cookies.get('ss_tk')
			ws.send(JSON.stringify({type:'login',token}))
			
		})
		ws.onmessage(function (data) {
			data = JSON.parse(data);
			if (!(data instanceof Object)) {
				return;
			}
			// console.log(data)
			store.state['WS_MSG'] = data
		})
		store.state[this.#WSStoreName] = ws

	}

}
export default {
	'$user':new user()
}