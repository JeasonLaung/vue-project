<template>
  <footer class="foot" ref="foot" v-show="isAbs">
    <div class="container">
      <div class="left">
        <div class="button-group">
          <button>下载 APP</button>
          <button>微信小程序</button>
        </div>
        <div class="link">
          <span>😊我的微信</span>
          <span>😊我的微博</span>
        </div>
      </div><!-- left -->
      <div class="right">
        <ul>
          <h3>企业服务</h3>
          <li>强人宝典</li>
          <li>公司搜索</li>
          <li>拉钩APP</li>
        </ul>
        <ul>
          <h3>用户帮助</h3>
          <li>帮助中心</li>
          <li>隐私政策</li>
          <li>在线提问</li>
        </ul>
        <ul>
          <h3>联系方式</h3>
          <li>我的邮箱</li>
          <li>联系我们</li>
        </ul>
      </div><!-- right -->
    </div><!-- container -->
    <!-- <div class="permission">
      <div class="text">
        <span>©2018 拉勾网京ICP备14023790号-2</span>
        &nbsp;  &nbsp;  &nbsp;  😊
        <span>京公网安备 11010802024043号</span>
      </div><!-- text
    </div><!-- permission -->
  </footer>
</template>

<script>

export default {
  name: 'Foot',

  data () {
    return {
      isShow:true
    }
  },
  
  method: {

  },
  props: {
      isAbs: Boolean
  },
  mounted(){
        // console.log(this.isAbs) 
  },
  components: {

  },
  

  computed: {
    
  },
  watch: {
    // 'this.$refs.foot.offsetHeight'(value){
    //   console.log(value) 
    // }
  },
};
</script>

<style lang="scss" scoped="scoped">

li{
  list-style: none;
}
  .foot{
    position: relative;
    padding-top: 50px;
    border-top: 1px solid #ddd;
    background-color: #fff;

    height: 200px;
    min-width: 1200px;
  }
  .container{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    padding: 60px 0 100px;
  }
  .left{
    width: 400px;
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .link{
      font-size: 14px;
      color: #888;
      span:first-child{
        margin-right: 20px;
      }
    }
    // margin: 70px 0;
  }
  .right{
    // display: flex;
    border-left: 1px solid #ddd;

    // align-items:center;
    // margin: 70px 0 40px;
    // justify-content:space-around;
    // flex:1;
    ul{
      display: inline-block;
      vertical-align: top;
      margin-left: 150px;
      li{
        color: #999;
        font-size: 14px;
        margin: 9px 0;
        
        
      }
      h3{
          font-size: 18px;
          color:#555;
          margin-top: 0;
          margin-bottom: 20px;
      }
      // text-align: center;
    }
  }
  .permission{
    height: 70px;
    line-height: 70px;
    background-color: #eee;
    font-size: 15px;
    .text{
      width: 1200px;
      color: #999;
      margin:0 auto;
    }
  }
  .button-group{
    display: flex;
    flex-direction:column;
    button{
      background-color: transparent;
      font-size:16px;
      margin: 0 0 15px;
      width: 200px;
      padding: 10px 20px;
      border: 1px solid #409EFF; 
      color:#409EFF;
      outline: none;
      transition:background-color .5s;
      &:hover{
        background-color: #409EFF;
        color: #fff;
      }
    }
  }
  
</style>