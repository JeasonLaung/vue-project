<template>
  <div class="mooncake">
    <h3 class="title" :class="{[color]:true}">
      <span>{{title}}</span>
      <slot name='right'></slot>
    </h3>
    <p class="content"><slot>内容</slot></p>
  </div>
</template>

<script>

export default {
  name: '',

  data () {
    return {
      
    }
  },
  props:{
    title:{
      type:String,
      default:'标题'
    },
    color:{
      type:String,
      default:'blue'
    },
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

<style lang="scss" scoped="scoped">
@import "../style/var.scss";

  .content{
    font-size: 15px;
    color: $font2;
    margin-top: 20px;
  }
  .mooncake{
    padding-bottom: 70px;
    & > .title{
      position: relative;
      margin-bottom: 15px;
      display: flex;
      justify-content:space-between;
      &.blue:before{
        background-color: $blue;
      }
      span{
        margin-left: 15px;
      }
      &:before{
        content: "";
        // display: inline-block;
        width: 7px;
        height: 28px;
        background-color: #111;
        position: absolute;
        top: 50%;
        transform:translateY(-50%);

      }
    }
  }


</style>