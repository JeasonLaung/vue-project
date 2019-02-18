<template>
  <header class="header">
    <div class="inner-header">
      <nav class="navbar">
        <img src="../assets/nav_logo.gif" alt="" class="logo">
        <div class="items">
          <!-- <router-link to="/" class="item" :class="{'active':/^(?!.*(company|college))/g.test($route['fullPath'])}">首页</router-link> -->
          <router-link to="/" class="item" :class="{'active':/^\/$/g.test($route['fullPath'])}">首页</router-link>
          <router-link to="/company" class="item" :class="{'active':$route['fullPath'].split('/')[1]=='company'}">企业</router-link>
          <router-link to="/college" class="item" :class="{'active':$route['fullPath'].split('/')[1]=='college'}">校园</router-link>
        </div>
      </nav>
      <div class="login-buttons" v-if="false === $user.getInfo()">
        <div class="items">
          <span class="item a" @click="show_login = true;">登录</span>
          <span class="item a" @click="">注册</span>
        </div>
      </div>
      <!-- 成功登录后 -->
      <div class="login-buttons" v-if="$user.getInfo()">
        <div class="items">
          <span class="item a">消息</span>
          <span class="item a" @click="$router.push('/my')">{{$user.get('name')}}</span>
        </div>
      </div>
    </div>
      <el-dialog  
        v-if="false === $user.getInfo()"
        :visible.sync="show_login"
        width="500px"
        center
        @close="show_login=false"
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
          <div class="input-group" :class="{'active':type}">

            <div class="left">
              {{value}}
              <s-input 
                placeholder="用户名" 
                style="margin-bottom: 20px;" 
                v-model="form1.username"
                />
              <s-input 
                see 
                type="password" 
                placeholder="密码"
                v-model="form1.password"
                />
            </div>
            
            <div class="right">
              <s-input 
                code
                placeholder="邮箱" 
                style="margin-bottom: 20px;" 
                v-model="form2.email"  
                @action=""
                />

              <s-input 
                type="text" 
                placeholder="验证码"
                />
            </div>

              <el-alert
                style="margin-top: 20px;position: absolute;bottom: -40px;"
                v-show="alert.visible==true"
                :title="alert.title"
                :type="alert.type"
                show-icon
                @close='alert.visible=false;'
              />

          </div>
        </div>
        

        <span slot="footer" class="dialog-footer">
          <el-button @click="$emit('cancelLogin');">取 消</el-button>
          <el-button type="primary" @click="beforeLogin()">登 录</el-button>
        </span>
      </el-dialog>

  </header>
  
  
</template>

<script>
import UserApi from '@/requests/api/user.js'
import check from '@/util/check.js'
// import LoginDialog from '@/components/User/LoginDialog'
export default {
  name: 'Navbar',

  data () {
    return {
      nav_index: 1,
      show_login:false,
      type:0,
      value:'',
      timer:null,
      form1:{
        username:'60000040@qq.com',
        password:'123456',
      },
      form2:{
        email:'',
        code:'',
      },
      alert:{
        title:'',
        type:'',
        visible:false,
      },
    }
  },
  
  methods: {
    beforeLogin(){
      let data,res,_check_data;
      if (this.type===1) {
        data = this.form2;
        _check_data = {
          "邮箱|require().email()":data.email,
          "验证码|require().num()":data.code
        }
      }else{
        data = this.form1;
        _check_data = {
          "用户名|require()":data.username,
          "密码|require()":data.password
        }
      }

      this.$validate.check(_check_data)
      .then((e)=>{
        this.$user.login(data)
        .then(()=>{
          this._alert(1,'登录成功！');
          this.timer = setTimeout(()=>{
            this.show_login = false
            console.log(this.$store.state.USER_INFO)
          },1500)
          
        })
        .catch((e)=>{
          this._alert(0,e.msg?e.msg:"网络异常")
        })
      })
      .catch(e=>{
        this._alert(0,e)
      })
    },

    _alert(yes_or_no,title){
      clearTimeout(this.timer);
      this.alert.type = yes_or_no ? 'success' : 'error'
      this.alert.title = title
      this.alert.visible = true;
      this.timer = setTimeout(()=>{
      this.alert.visible = false;
      },5000)
    }
  },


  components: {
    // 'login-dialog':LoginDialog
  },
  
  mounted(){
    // this.$store.dispatch('login',123)
      // .then(e=>{console.log(e)})
      // .catch(e=>{console.log(123456789)})
  },
  computed: {
    
  },
  watch: {
    // '$route'(value){
      // console.log(value['fullPath'].split('/')[1])
    // }
  },
};
</script>

<style lang='scss'>
@import '@/style/var.scss';
a,a:visited{
    text-decoration: none;
    color:#999;

}
  header.header{
    width: 100%;
    background-color: #fff;
    border-bottom: 2px solid #eee;
    height: 54px;
    position: fixed;
    z-index: 999;
    top: 0;
    .inner-header{
      margin: 0 auto;
      width: 1200px;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
    }

  }
  // .login-buttons{
  //   // width: 120px;
  //   .item{
  //     cursor: pointer;
  //     color: #888;
  //     border: none !important;
  //   }
  // }
  .login-buttons{
    // line-height: 60px;
    // position: absolute;
    display: flex;
    align-items:center;
    max-width: 180px;
    overflow: hidden;
    text-overflow:ellipsis!important;

    .item{
      white-space: nowrap;
      overflow: hidden;
      margin-left: 20px;
      color: #888;
    }
  }
  .navbar{
    position: relative;
    display: flex;
    align-items:center;
    .logo{
      max-height: 25px;
      margin: -2px 20px 2px 0;
    }
    .items{
      display: flex;
      // justify-content:space-between;
      padding-left: 40px;
      // width: 210px;
    }
    .item{
      margin-left: 20px;
      min-width: 30px;
      max-width: 50px;

      height: 56px;
      line-height: 56px;
      box-sizing:border-box;
      display: flex;
      justify-content:center;
      &.active{
        color: #555;
        border-bottom: 2px solid #409EFF;
        &:hover{
          color: #555;
        }
      }
      &:hover{
        color: rgb(23, 81, 153);
        border-bottom: 2px solid #409EFF;
      }
    }

  }
    .el-dialog{
    padding-left: 40px;
    padding-right: 40px;
    
    .input-group{
      margin-top: 40px;
      position: relative;
      width: 740px;
      left: 0;
      transition:left .5s;
      &.active{

        left: -370px;
      }
      .el-dialog__body{
        overflow: hidden;
      }
      .left{
        // position: relative;
        display: inline-block;
        // width: 100%;
        width: 330px;
        margin: 0 20px;
      }
      .right{
        width: 330px;
        margin: 0 20px;
        
        display: inline-block;
        // width: 100%;
        // position: absolute;
        // top:0;
        // left: 100%;
        // width: 100%;
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
