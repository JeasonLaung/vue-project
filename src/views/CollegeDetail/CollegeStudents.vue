<template>
  <div class="view" style="min-height: 400px; ">
    <cake 
      v-if="end"
      v-for="(i,index) in years"
      :title="i+' 届'"
      :key="index"

    >
      <ul>
        <li 
          v-for="(x,index2,key) in majors[i]" 
          :key="index2"
          class="major-tag"
          :class="{'active':active_major_id == x.id}"
          @click="loadStudents(i,x.id,x.name)">
          {{x.name}}({{x.student_num}})
        </li>
      </ul>
    </cake>
    <cake :title="active_major_name" ref="result">
      <ul
        v-if="students !=false"
        class="students"
      >
        <li
          class="student"
          v-for="(student,index3) in students"
          :key="index3"
        >
          <img :src="student.logo">
          {{student.name}}
        </li>
      </ul>
      <p class="noresult" v-if='students.length == 0 && active_major_id != 0'>
        <i class="iconfont icon-noresult"></i> 暂无学生
      </p>
    </cake>
    
  </div>
</template>

<script>
import Cake from '@/components/cake/Cake.vue'
import { scrollY } from '@/util/tool.js'
import { collegeYears,collegeMajors,collegeStudents } from '@/requests/api/college.js'
export default {

  name: '',

  data () {
    return {
      years:[],
      majors:{},
      end:false,
      students:[],
      active_major_id:0,
      active_major_name:''
    }
  },
  mounted(){
    let that = this;
    let school_id = this.$route.params.id;
    collegeYears(school_id).then(data=>{
      // console.log(data)
      // this.years = data.data;
      let years = data.data.sort((a,b)=>b-a);
      this.years = years;
      for (var i = 0; i < years.length; i++) {
        // console.log(years[i])
        let s = i;
        collegeMajors(school_id,years[i]).then(data2=>{
          this.majors[years[s]] = data2.data
          if (s == years.length-1) {
            this.end = true;
          }
          // this.majors[years[i]] = data2.data
        }).catch(e=>{})
      }
    }).catch(e=>{});

    

  },
  methods: {
    loadStudents(year,major_id,major_name){
      if (this.active_major_id == major_id) {
        this.active_major_id = 0;
        this.active_major_name = '';
        this.students = [];
        return;
      }
      /*结果滑动到顶部*/
      scrollY(this.$refs.result.$el.offsetTop - 100,()=>{
        let school_id = this.$route.params.id;
        // console.log(this.students[year])
        collegeStudents(school_id,year,major_id).then(data=>{
          this.students = data.data
          this.active_major_id = major_id;
          this.active_major_name = major_name;
        })
      });

      
    }
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
  }
  .major-tag{
    // height: 40px;
    // line-height: 40px;
    font-size: 18px;
    border: 1px solid $blue;
    color: $blue;
    display: inline-block;
    border-radius: 20px;
    padding:10px 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;

    // &:first-child{
    //   margin-left: 0;
    // }
    &:hover{
      background-color: rgba(64, 158, 255,.2);
    }
    &.active{
      background-color: $blue;
      color: #fff;
    }
  }
  .student{
    display: inline-block;
    margin-left: 30px;
    margin-bottom: 20px;
    text-align: center;
    color: $font2;
    font-size: 15px;
    &:first-child{
      margin-top: 20px;
    }
    img{
      width: 60px;
      height: 60px;
      display: block;
      border-radius: 100%;
      margin-bottom: 5px;
    }
  }
  .students{
    margin: 0 auto;
    border:1px solid #ccc;
    border-radius: 30px;
    background-color: #eee;
  }
  .noresult{
    margin: 50px;
    font-size: 20px;
  }
</style>
