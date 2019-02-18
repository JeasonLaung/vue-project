<template>
  <!-- :before-close="handleClose"
         title="登录"-->
  <el-dialog
    
    :visible.sync="show"
    width="500px"
    center
    @close="$emit('cancelLogin',show);"
    :modal-append-to-body='false'>
    <!-- <span>这是一段信息</span> -->
    <div class="login-from" style="overflow: hidden;">
      <!-- <h1>登录</h1> -->
      <div class="login-tab">
        <div 
          class="pointer"
          :class="{'right':type==1}"
          />
        <div class="tab-item " :class="{'active':type==0}">
          <span @click="type=0">密码登录</span>
        </div>
        <div class="tab-item" :class="{'active':type==1}">
          <span @click="type=1">验证码登录</span>
        </div>
      </div>
      <div class="input-group">

        <div class="left animated" :class="{'fadeOutLeft':type==1,'fadeInLeft':type==0}">
          {{value}}
          <s-input reset placeholder="用户名" style="margin-bottom: 20px;"></s-input>
          <s-input see type="password" placeholder="密码"></s-input>
        </div>
        
        <div class="right animated" :class="{'fadeInRight':type==1,'fadeOutRight':type==0}">
          <s-input placeholder="邮箱" style="margin-bottom: 20px;" v-model="form2.email" code @action="checkEmail"></s-input>
          <s-input reset type="text" placeholder="验证码"></s-input>
        </div>

        <el-alert
          style="margin-top: 20px;position: absolute;bottom: -40px;"
          :title="msg.content"
          :type="msg.type">
        </el-alert>
      </div>
    </div>
    

    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancelLogin');">取 消</el-button>
      <el-button type="primary" @click="">登 录</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Sinput from '@/components/Input/Sinput'
export default {
  name: '',
  
  data () {
    return {
      // dialogVisible:true
      //登录方式
      type:0,
      value:'',
      form1:{
        username:'',
        password:'',
      },
      form2:{
        email:'',
        code:'',
      },
      msg:{
        type:'',
      },
      
    }
  },
  model: {
    prop: 'show',
    event: 'cancelLogin'
  },
  props:{
    show:Boolean,
  },
  methods: {
    checkEmail(){
      // console.log(this.$validate.check(this.form2.email,'email'))

    },
    tell(a){
      console.log(a)
    },
    handleClose(){

    },
  },

  components: {
    's-input':Sinput
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
@import '@/style/var.scss';
  .el-dialog{
    padding-left: 40px;
    padding-right: 40px;

    .input-group{
      margin-top: 40px;
      position: relative;
      .right{
        position: absolute;
        top: 0;
        width: 100%;
      }
    }
    // .input-group-right{
    //   position: absolute;
    //   top: 0
    //   margin-top: 40px;
    // }
    .login-tab{
      display: flex;
      padding-bottom: 25px;
      
      border-bottom: 1px solid $border1;
      position: relative;

      .pointer{
        height: 1px;
        background-color: $blue;
        width: 50%;
        position: absolute;
        left: 0;
        bottom: 0;
        transition:left .5s;
        &.right{
          left: 50%;
        }
        &:before,&:after{
          content: "";
          display: block;
          position: absolute;
          // z-index: 10;
          left: 50%;
          bottom: -2px;
          transform:translateX(-50%);
          
          border-top: 10px solid transparent;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
        &:after{
          border-bottom: 10px solid #fff;
        }
        &:before{
          bottom: 0px;
          border-bottom: 10px solid $blue;
          // border-color-bottom: $blue;
        }
      }
      .tab-item{
        font-size: 16px;
        flex:1;
        display: flex;
        justify-content:center;
        span{
          cursor: pointer;
        }
        
        &.active{
          color: $blue;
        }
      }
    }
  }
  .login-from{
    padding-bottom: 40px;

    h1{
      margin-bottom: 40px;
      text-align: center;
    }
  }

</style>