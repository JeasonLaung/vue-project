<template>
  <div class="main college-card-bg" :style="{'background-image':'url('+require('@/assets/school_bg.jpg')+')'}">
    <div class="inner-main">
      <h1 class="college-name">
        {{college.name}}
      </h1>
      <p class="location">
        <i class="el-icon-location-outline"/>
        {{ college.province }}
        {{ college.city ?  ',' + college.city : '' }}
      </p>
    </div><!-- inner-main -->

    <div class="article">
      <div class="inner-article">
        <tab>
          <tab-item :to="'/college/'+$route.params.id">学校详情</tab-item>
          <tab-item :to="'/college/'+$route.params.id+'/students'">学校人才</tab-item>
        </tab>
        <router-view v-if="JSON.stringify(college)!='{}'" :college="college"/>
      </div>
      
    </div><!-- article -->

  </div>

</template>

<script>
import { collegeGet } from '@/requests/api/college.js'
import Tab from '@/components/tab/Tab.vue'
import TabItem from '@/components/tab/TabItem.vue'
export default {
  name: '',

  data () {
    return {
      college:{}
    }
  },
  
  methods: {
  },

  components: {
    'tab':Tab,
    'tab-item':TabItem,
  },
  
  mounted(){
    collegeGet(this.$route.params.id).then(data=>{
      this.college = data.data
    }).catch(e=>{})
  },

  computed: {
    
  },
  watch: {

  },
};
</script>
<style lang="scss" scoped="scoped">
  @import "@/style/var.scss";
  .college-card-bg{
    
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: 0 -100px;
  }
  .inner-main,.inner-article{
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0;
  }
  .college-name{
    margin-bottom: 30px;
  }
  .location{
    color: $font2;
  }
</style>