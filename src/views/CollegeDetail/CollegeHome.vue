<template>
  <div class="view">
    <cake title="学校简介" >
      <p v-html="college.description" v-if='college.description' class="description" />
      <p v-html="'暂无'" v-if='!college.description'/>
    </cake> 
    <cake title="学校图片">
      <el-carousel trigger="click" height="400px" style='background-color:#eee;'>
        <el-carousel-item 
          v-for="(item,index) in college.photos" 
          :key="index"
          >
          <img :src="item.path" alt="" class="college-photos">
        </el-carousel-item>
      </el-carousel>
    </cake> 
  </div>
</template>

<script>
import Cake from "@/components/cake/Cake.vue"
export default {
  name: '',

  data () {
    return {
      
    }
  },
  props:{
    college:{
      type:Object
    }
  },
  methods: {
    
  },

  components: {
    'cake':Cake
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped="scoped">
  @import "@/style/var.scss";
  .view{
    padding: 30px 0;
    width: 800px;
    .description{
      a, a:visited{
        color: $blue!important;
      }
    }
  }
  .college-photos{
    display: block;
    margin: 0 auto;
    max-height: 400px;
    height: 100%;
  }

</style>
