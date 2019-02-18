<template>
  <div class="card">
    <div class="bg">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="card-inner">
      <p class="name a">岗位名</p>
      <p class="second-name a">公司名公司名公司名公司名公司名公司名</p>
      <p class="tag">
        <!-- <span
         v-for="(i,index) in ['1年经验','本科']"
         :key="indedx">
          {{i}}
        </span> -->
        1年经验 / 本科
      </p>
      <p class="salary">
        5k-10k
      </p>
    </div>
    
  </div>
</template>

<script>

export default {
  name: '',

  data () {
    return {
      
    }
  },
  
  method: {
    
  },

  components: {

  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped="scoped">
@import "@/style/var.scss";
  .card{
    box-sizing:border-box;
    border: 1px solid $border1;
    height: 250px;
    width: 350px;
    color: $font1;
    border-radius: 10px;
    position: relative;
    background-color: #fff;
    transition:transform .3s;
    &:hover{
      box-shadow: 0 0 10px $bgc1; 
      transform:scale(1.03);
      z-index:10;
      .bg{
        // overflow: visible;
        opacity: .8;
      }
    }
    
    .bg{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: .4;
      background-size: 70%;
      background-position: bottom;
      overflow: hidden;
      transition:opacity .3s;
      img{
        position: absolute;
        bottom:-20px;
        right: -10px;
        max-width: 150px;
        max-height: 150px;
      }
      // background-position: -50% -50%;
    }
    // background-color: $bgc2;
    .card-inner{
      padding: 30px 20px 0;
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }

    
    .name{
      text-align: center;
      font-size: 21px;
      font-weight: bold;
      margin-bottom: 10px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .second-name{
      width: 250px;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .tag{
      margin: 10px auto;
      text-align: center;
      font-size: 15px;
      color: $font3;
    }
    .salary{
      font-size: 30px;
      color: $warning;
      margin: 50px 0 50px 40px;
    }
    // .el-tag{
    //   margin-right: 10px;
    // }
  }
</style>