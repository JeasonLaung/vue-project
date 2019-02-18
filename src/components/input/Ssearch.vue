<template>
  <div class="s-search">
    <input 
      class="input" 
      type="text" 
      ref="s-search-input"
      :placeholder="placeholder"
      @input="$emit('input',$event.target.value)"
      @keyup="$emit('keyup',$event)"
      @keyup.enter="$emit('enter',$event.target.value)"
      :value="value"
      />
      <!--       @keydown="$emit('keydown',$event)" -->
    <button class="button" @click="$emit('enter',$refs['s-search-input'].value)">
      <slot><i class="el-icon-search"></i>&nbsp;&nbsp;&nbsp;搜索</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Ssearch',

  data () {
    return {

    }
  },
  
  props:{
    model:{
      event:'input',
      prop:'value',
    },
    placeholder:String,
    value:String
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
  @import "../style/var.scss";
  .s-search{
    border: 1px solid $blue;
    box-sizing:border-box;
    border-radius:  2px;
    // display: inline-block;
    width: 100%;

    display: flex;
    .input{
      color: $font1;
      border-radius: 2px 0 0 2px;
      padding: 10px 15px 10px 15px;
      border:0;
      outline: 0;
      flex:1;
      &::-webkit-input-placeholder { /* WebKit browsers */
        color:#ccc;
        // font-size:16px;
      }
      &::-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:#bbb;
        // font-size:16px;
      }

      &::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:#bbb;
        // font-size:16px;
      }

      &::-ms-input-placeholder { /* Internet Explorer 10+ */
        color:#bbb;
        // font-size:16px;
      }
    }
    .button{
      // display: inline-block;
      cursor: pointer;
      // border-radius: 0 2px 2px 0;
      // border: 1px solid $border0;
      background-color: $blue;
      padding: 10px 30px;
      color: #fff;
      border: none;
      outline: none;
      border-left: 1px solid #fff;
      
      // &:active{
      //   // background-color: $blue;
      //   // opacity: .89;
      //   border-left: 1px solid $blue;
      //   background-color: #fff;
      //   color: $blue;
      //   box-sizing:border-box;
      // }
    }
  }
  


</style>