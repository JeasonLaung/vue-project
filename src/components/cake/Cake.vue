<template>
  <div class="s-cake">
    <div class="title">{{title}}</div>
    <p class="content" :style="{'text-indent': indent}"><slot></slot></p>
  </div>
</template>

<script>

export default {
  name: 'Cake',

  data () {
    return {
      
    }
  },
  
  method: {
    
  },

  components: {

  },
  
  props:{
    title:{
      type:String,
      default:"",
    },
    indent:{
      type:String,
      default:"",
    }
  },
  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
@import '@/style/var.scss';
  .s-cake{
    position: relative;
    .title{
      font-size: 20px;
      line-height: 1.5;
      color: $font1;
      background-color: #fff;
      position: absolute;
      top: -15px;
      padding-right: 20px;
    }
    .content{
      margin-top: 20px;
      padding: 30px;
      color: $font2;
      font-size: 15px;
      line-height: 1.5;
      padding-left: 0;
      border-top: 1px solid #ddd;
    }
  }


</style>