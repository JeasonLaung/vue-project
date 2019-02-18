<template>
  <div class="user-page">
    <div class="user-navbar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div><!-- logo -->

      <div class="container">
        <ul class="items">
          <li v-for='(item,index) in navbars'
            :key="index"
            :class="{'active':navbarIndex==index}"
            @click="navbarIndex = index;$router.push(item.url)">
            {{item.title}}
          </li>
        </ul><!-- items -->

        <div class="right">
          <div class="face-container">
            <img :src="$user.get('logo')" class="face" alt="">
          </div>
          <span>{{$user.get('name')}}<i class="el-icon-arrow-down"></i></span>
        </div><!-- right -->

      </div><!-- container -->

    </div><!-- user-navbar -->
    <div class="user-container">
      <div class="nav">
        <ul class="items">
          <li class="item"
          v-for="(i,index) in navs"
          :key='index'
          :class="{'active':navIndex==index}"
          @click="navIndex = index;$router.push(i.url)">
            <i class="iconfont" :class="{['icon-'+i.icon]:true}"></i>
            {{i.title}}
          </li>
        </ul>
      </div><!-- user-nav -->
      <div class="main-outer">
        <div class="main">
          <router-view />
        </div>
      </div>
    </div>
    

  </div><!-- user-main -->

</template>

<script>

export default {
  name: '',

  data () {
    return {
      navbarIndex:0,
      navIndex:0,
      navs:[],
      navbars:[]
    }
  },
  mounted(){
    // console.log(this.$user.getInfo());
    this.navs = this.$store.USER_MENU;
    this.navbars = this.$store.USER_NAVBAR;
    if(this.$route.meta['navIndex']){
      this.navIndex = this.$route.meta['navIndex'];
    }
    // console.log(this.$route);
  },
  methods: {
    
  },

  components: {

  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  @import "@/style/var.scss";
  .user-page{
    // position: relative;
    display: flex;
    flex-direction:column;
    height: 100%;
    width: 100%;
    // min-width: 1200px;
    // min-height: 700px;
    position: absolute;
    overflow: hidden;

  }
  .user-navbar{
    height: 62px;
    background-color: $nav-color;
    display: flex;
    .logo{
      width: 194px;
      display: -webkit-box;
      -webkit-box-align:center;
      -webkit-box-pack:center;
      img{
        max-height: 62px;
        max-width: 100px;

      }
    }
    .container{
      display: flex;
      flex:1;
      justify-content:space-between;
      .items{
        margin-left: 30px;
        li{
          display: inline-block;
          height: 62px;
          line-height: 55px;
          font-size: 16px;
          margin: 0 35px;
          position: relative;
          cursor: pointer;
          color: $font2;
          &:hover{
            color: $font3;
          }
          &.active{
            cursor: default;
            color: $blue;
          }
          &.active:after{
            opacity:1;
            display: block;
            position: absolute;
            content: '';
            height: 4px;
            width: 50px;
            border-radius: 2px;
            background-color: $blue;
            bottom:10px;
            left: 50%;
            transform:translateX(-50%);
          }
        }
      }
      // border-bottom: 1px solid $border1;
      .right{
        margin-right: 30px;
        height: 62px;
        line-height: 62px;
        display: flex;
        align-items:center;
        span{
          cursor: pointer;
          font-size: 15px;
          color: $font2;
          margin-left: 10px;
        }
        .face-container{
          cursor: pointer;
          background-color: #fff;
          border: 1px solid $border1;
          display: flex;
          border-radius: 100%;
          overflow: hidden;
        }
        .face{
          height: 40px;
          width: 40px;

        }
      }
    }
  }
  .user-container{

    display: flex;
    flex:1;

    .nav{
      width: 194px;
      background-color: $nav-color;
      .items{
        width: 100%;
        cursor: pointer;
        margin-top: 10px;
        .item{
          color: $font2;
          padding: 15px 0 15px 40px;
          // text-align: center;
          font-size: 14px;
          .iconfont{
            margin-right: 5px;
            font-size: 18px;
          }
          &:hover{
            background-color: rgba(220,225,229,.7);
          }
          &:active,&.active{
            background-color: rgb(220,225,229);
            color: $blue;
          }
        }
      }
    }
    .main-outer{
      flex:1;
      background-color: $nav-color;
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      // width: 1200px;
      .main{

        border-top: 1px solid $border1;
        border-left: 1px solid $border1;
        border-radius: 10px 0 0;
        height: 100%;
        flex:1;
        overflow-y: auto;
        background-color: #f8f8f8;
        
      }
    }
  }

</style>