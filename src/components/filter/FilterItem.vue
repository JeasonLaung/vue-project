<template>
  <div class="filter-item">
    <ul>
      <h4 class="title">{{title}}：</h4>
      <li v-for="(i,index) in list" :key="index" :class="{'active':active === index}" @click="choose(index)" :style="{'cursor':active === index?'default':'pointer'}">
        {{i instanceof Object ? i.title : i}}
      </li>
      <li class="more" v-if="moreList" @click="isShow=!isShow">{{!isShow?'更多':'隐藏'}} <i class="el-icon-arrow-down" :class="{'inverse':isShow}"/></li>
    </ul>
    <ul class="more-list" :class="{'hidden':isShow==false}">
      <li v-for="(i,index) in moreList" :key="index">
        {{i}}
      </li>
    </ul>
    
  </div>
</template>

<script>

export default {
  name: 'FilterItem',

  data () {
    return {
      isShow:false,
      active:0
    }
  },
  
  methods: {
    tell(e){
      console.log(e)
    },
    choose(index){
      // console.log(index)
      if (index==this.active) {
        this.$emit('repeat');
        // this.active=index;
      }else{
        this.active=index;
        this.$emit('click',{row:this.row,col:index});
      }
      
    }
  },

  components: {

  },
  props:{
    row:{
      type:Number,
      default:0,
    },
    moreList:{
      type:[Array,Object],
      // default:()=>{
      // return [
      //     '全国',
      //     '上海',
      //     '上海',
      //     '上海',
      //     '上海',
      //   ]
      // }
    },
    title:String,
    list:{
      type:[Array,Object],
      default:()=>{
      return [
          '全国',
          '上海',
          '上海',
          '上海',
          '上海',
        ]
      }
    },
  },

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  @import "@/style/var.scss";
  
  .filter-item{
    font-size: 14px;
    color: $font2;
    position: relative;
    .more{
      position: absolute;
      right: 0;
      // display: inline;
      .el-icon-arrow-down{
        transition:transform .5s;
      }
      .inverse{
        transform:rotate(180deg);
        
      }
    }
    .more-list{
      border-radius: 2px;
      position: relative;
      
      &.hidden{
        height: 0;
        padding: 0;
        margin:0;
      }
      margin-top: 7px;
      height: 30px;
      overflow: hidden;
      transition: all .3s;
      // position: relative;
      background-color: #fff;
      // padding-bottom: 7px;
      li{
          height: 20px;
      }

    }
    // border:2px solid $border2;
    ul{
      padding: 7px 0 0;
      display: flex;
      li{
        margin-right: 10px;
        padding: 2px 10px;
        // @include no-select;
        // cursor: pointer;
        &:hover,&.active{
          background-color: $blue;
          color:#fff;
          border-radius: 1px;
        }
      }
      .title{
        font-weight: bold;
        color: $font1;
        padding: 2px 0;
      }
    }
    
  }
</style>
