<template>
  <div class="company-jobs">
    <Job 
      v-for="(j,index) in jobs"
      :key="index"
      :title="j.title"
      :salary="j.min_salary+'-'+j.max_salary+'k'"
      :list="[j.experience,j.degree]"
      :publish="j.create_time.split(' ')[0]"
      style='margin-bottom: 10px;'
      @detail="$router.push('/job/'+j.id)"
      />
     <!--  <Job 
      title="洗碗"
      salary="15-16k"
      :list="['经验不限','学历不限']"
      publish="2019-12-25"
      style='margin-bottom: 10px;'
      /><Job 
      title="洗碗"
      salary="15-16k"
      :list="['经验不限','学历不限']"
      publish="2019-12-25"
      style='margin-bottom: 10px;'
      /><Job 
      title="洗碗"
      salary="15-16k"
      :list="['经验不限','学历不限']"
      publish="2019-12-25"
      style='margin-bottom: 10px;'
      /> -->
  </div>
</template>

<script>
import Job from "@/@components/Job/JobMiddleCard"
import {companyGet} from "@/requests/api/company.js"
export default {
  name: '',

  data () {
    return {
      jobs:[]
    }
  },
  props:{
    company:[Object,Array]
  },
  method: {
    
  },

  components: {
    Job
  },
  
  mounted(){
    // console.log(this.company.jobs)
    this.jobs = this.company.jobs
    // if (this.jobs == undefined || this.jobs == false) {
    //   companyGet(this.$route.params.id).then(data=>{

    //   })
      // companyGet(this.$route.params.id).then(data=>{
      //   alert(123);
      //   this.jobs=data.data;
      // }).catch(e=>{})
      // console.log(companyGet)
    // }
  },
  created(){
    // console.log(this.company.jobs)
  },
  computed: {
    
  },
  watch: {
    // '$route.path'(value){

    // }
  },
};
</script>

<style lang="scss">
  .company-jobs{
    width: 100%;

  }
</style>
