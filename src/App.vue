<template>
  <div id="app">
    <navbar @login="" @register="" v-if="$route.meta['other'] !== true"></navbar>
    
    <div 
      class="page" 
      ref="page" 
      v-if="isShow" 
      style="min-height: 500px;" 
      :style="{'margin-top': $route.meta['other'] !== true ? '56px' : '0px'}">
      <transition enter-active-class="animated ">
        <router-view :class="{'fadeIn':$route.meta['other'] !== true}"/>
      </transition>
    </div> 
    
    <foot :isAbs='true' v-if="$route.meta['other'] !== true"/>
  </div>
</template>

<script>
// import ProgressBar from '@/components/User/LoginDialog.vue';
// import ProgressBar from '@/components/ProgressBar.vue';
import Navbar from '@/components/Navbar.vue';
import Foot from '@/components/Foot.vue';

import { mapState } from 'vuex'
export default {
  data() {
    return {
      // activeIndex:'1',
      isShow:true
    };
  },
  computed:{
    ...mapState({'ws':'WS'})
  },
  methods:{
    tell(){
      console.log(this.offsetHeight)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted(){
    // this.$user.login()
    // this.$ajax.post('/api/').then(e=>console.log(e)).catch(e=>console.log(e));
    // console.log(this.$store.state.WS['#alive'])
    // this.$store.state.WS.send('123')
    // })
  },
  components: {
    'navbar':Navbar,
    'foot':Foot,
    // 'progress-bar': ProgressBar,
  },
  //重点检查登录状态
  created(){
    this.$user.refreshInfo();
    // console.log(this.$user.getInfo())
  },
  watch:{
    '$route.path'(value){
      // console.log(value)
      // this.$user.refreshInfo();
      // console.log(this.$user.getInfo())
    }
  }
};
</script>

<style lang="scss">
@import "@/style/var.scss";
@import "@/style/icon.scss";
@import "@/style/common.scss";
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 6px;  
    height: 6px;  
    background-color: #F5F5F5;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #FFF;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #AAA;  
}

* {
  padding: 0;
  margin: 0;
  
}
h1,h2,h3,h4,h5{
  color: $font1;
}
.clear:after{
  clear: both;
  content: "";
  display: block;
}
// .page{
//   width: $container-width;
//   margin: 0 auto;
// }
#app{
  // width: 100%;
  // background-color: #eee;
}
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
