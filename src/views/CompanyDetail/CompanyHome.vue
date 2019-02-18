<template>
  <div>
    <cake title="公司简介" indent="1.5rem">
      <p v-html="company.description"></p>
    </cake>
    <cake title="公司福利" indent="1.5rem">
      {{company.welfare||"暂无"}}
    </cake>
    <cake title="公司标签">
      <el-tag v-for='i in company.labels' style="margin-right: 10px;">
        {{i.name}}
      </el-tag>
    </cake>
    <cake title="图片展示">
      <el-carousel trigger="click" height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </cake>
    <cake title="面试评论">
      
      <div class="sum-rate">
          <span class="text">综合评分</span>
          <el-rate
            v-model="rate"
            disabled
          />
          <span class="rate-num">4.5</span>
      </div>
    </cake>
  </div>
</template>

<script>
import cake from '@/components/cake/Cake.vue'
export default {
  name: '',

  data () {
    return {
      rate:2.5
    }
  },
  
  method: {
    
  },

  props:{
    company:{}
  },

  components: {
    cake
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";
.el-carousel{
  background-color: $font3;
  border-radius: 5px;
}
.sum-rate{
  display: flex;
  .text{
    // align-self:flex-end;
    // vertical-align: bottom;
    // line-height: 20px;
    margin-top: 7px;
    margin-bottom: -7px;
    margin-right: 10px;
  }
  .rate-num{
    color: $danger;
    font-size: 22px;
    margin-left: 10px;
  }
}
  .el-rate__icon{
    font-size:30px!important;
  }


</style>