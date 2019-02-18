<template>
    <div class="cake-card">
      <div class="header">
        <div class="header-top">
          <h4 class="title">{{name}} <span>{{from}} 至 {{to}}</span> </h4>
          <i slot='right' class="el-icon-edit-outline a"/>
        </div>
        <p class="position">{{position}}{{degree}} {{major}}</p>
      </div>
      <p class="description">
        {{description}}
      </p>
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
    description:String,
    position:String,
    name:String,
    from:String,
    to:String,
    degree:String,
    major:String,

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
@import "@/style/var.scss";
  .cake-card{
    // padding: 15px;
    .title{
      color: $font2;
      font-weight: bold;
      font-size: 17px;
      margin-bottom: 10px;
      // line-height: 30px;
      span{
        font-size: 13px;
        // padding-left: 15px;
        margin-left: 20px;
        font-weight: normal;
        color: $font2;
      }
    }
    .position{
      // margin-top: 10px;
    }
    .description{
      padding: 10px 0; 
    }
    .header-top{
      display: flex;
      justify-content:space-between;
    }
    .header{
      border-bottom: 1px solid $border1;
      padding: 10px 0; 

    }

  }


</style>