import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// import socket from '@/requests/websocket.js'
// const ws = new socket({url:'ws://127.0.0.1:8001',reconnect:true,reconnectTime:5000,reconnectTimes:999,heartBeat:5000})

export default new Vuex.Store({
  state: {
  	// 'PROGRESS_BAR':0,
  	// 'CITY':''
    'WS':null,
  	'WS_MSG':null,
    'USER_INFO':null,
    'NO_PHOTO_PATH':'../../assets/nophoto.gif',
    'USER_MENU':[],
    'USER_NAVBAR':[]
  },
  mutations: {
    // LOGIN(state,data){

    // }
    // SET_INFO(state,data){
    //   state.USER_INFO = data
    // }
  },
  getters:{
  	user_info(state){
      return state.USER_INFO
    }
  },
  actions: {
    // login({commit},params){
    //   // return 123;
    //   return new Promise((res,rej)=>{
    //     if (false) {
    //       res(123)
    //     }else{
    //       rej(456)
    //     }
        
    //   })
    //   // return commit('LOGIN',params)
    // }
  },
});
