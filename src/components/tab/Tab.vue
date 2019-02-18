<template>
  <div class="s-tab">
    <ul>
      <slot></slot>
      <!-- <li class="active">热门职位</li>
      <li>最新职位</li>
      <li>推荐职位</li> -->
    </ul>
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
.s-tab{
  align-items:center;
  font-size: 16px;
  height: 60px;
  line-height: 58px;
  border-bottom: 1px solid #dedede;
  box-sizing:border-box;
  color:#999;
  ul{
    display: flex;
    // justify-content:space-between;
    // width: 300px;

    li{
      list-style: none;
      margin-right: 30px;
      &.active{
        
        box-sizing:border-box;
        border-bottom: 2px solid #333;
      }/*active*/
    }/*li*/
  }/*ul*/
}/*navbar*/


</style>