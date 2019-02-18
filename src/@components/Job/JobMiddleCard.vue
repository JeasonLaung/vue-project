<template>
  <div class="job-middle-card">
    <h3 class="title">
      <span class="left a" @click="$emit('detail')">
        {{title}}
      </span>
      <span class="right">
        {{salary}}
      </span>
    </h3>
    <p class="content">
      <span class="left">
        <span v-for="(i,index) in list" :key="index">
          {{i}}
        </span>
      </span>
      <span class="right">
        {{publish}} 发布
      </span>
    </p>
  </div>
</template>

<script>

export default {
  name: '',
  props:{
    title:String,
    salary:String,
    list:Array,
    publish:String,

  },
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
<style lang="scss">
@import "@/style/var.scss";
  .job-middle-card{
    display: block;
    border:1px solid $border1;
    padding: 15px 10px 20px;
    &:hover{
      background-color: $bgc2;
    }
    // height:20px;
    .title{
      color:$font1;
      margin-bottom: 5px;
      display: flex;
      justify-content:space-between;
      border:none!important;
      .right{
        color: $danger;
      }
    }
    .content{
      // border:none!important;
      display: flex;
      justify-content:space-between;
      color: $font3;
      font-size: 15px;
      .left{
        &>span{
          &:before{
            display: inline-block;
            content: "/";
            // margin: 0 5px;
          }
          &:first-child:before{
            display: none;
            content: "";
          }
        }
      }
      .right{
        font-size: 14px;
      }
    }
  }
</style>