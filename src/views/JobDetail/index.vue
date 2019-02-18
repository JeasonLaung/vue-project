<template>
  <div class="job-detail">
    <!-- <div class="inner">
      <div class="article" style="position: relative;"> -->
    <div class="header">
      <div class="inner">
        <div class="left">
          <p class="title">{{job.title}}</p>
          <p class="middle">
            <span class="salary">{{job.min_salary}}-{{job.max_salary}}k</span>
            <span>{{job.city}}</span>
            <span>{{job.experience}}</span>
            <span>{{job.degree}}</span>
          </p>
          <p class="publish">{{job.create_time}} 发布</p>
        </div>
        <div class="right">
          <p class="btn-group">
            <el-button>收藏</el-button>
            <el-button type="primary">投递简历</el-button>
          </p>
          <p>
            <!-- <a href=""></a> -->
            <span>完善简历</span>
          </p>
        </div>
      </div>
    </div>
      <!-- </div> --><!-- article -->
      
    <div class="article">
      <div class="content">
        
        <s-cake title="岗位介绍" >
          <p v-html="job.description"></p>
        </s-cake>
        <s-cake title="福利">
          {{job.welfare || "暂无" }}
        </s-cake>
        <!-- <s-cake title="福利">
          福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利福利
        </s-cake> -->
      </div>
      
      <div class="aside">
        <div class="company-info" v-if='JSON.stringify(company) != "{}"'>
          <div class="logo">
            <img class="a" :src="company.logo" :alt="company.name"  @click='$router.push("/company/"+company.id)'>
          </div>
          <h2 class="a" @click='$router.push("/company/"+company.id)'>{{company.name}}</h2>
          <p class="company-description">{{HTML2TEXT(company.description).cut(40)}}</p>
          <div class='jobs'>
            <h3>该公司其他职位</h3>
                
            <job 
              v-for="(j,index) in company.jobs"
               :key="index"
              v-if='j.id!=$route.params.id'
              :title="j.title"
              :list="[j.experience,j.degree]"
              :publish="j.create_time.split(' ')[0]"
              :salary="j.min_salary+'-'+j.max_salary+'k'"
              style="margin-bottom: 10px;"
              @detail='$router.push("/job/"+j.id)'
            />
          </div>
        </div>
      </div>
    </div>
      <!-- <div class="aside">
        我在右边
      </div> --><!-- aside -->
    <!-- </div> -->

  </div>
</template>

<script>
import JobMiddleCard from '@/@components/Job/JobMiddleCard.vue'
import { jobGet } from '@/requests/api/job.js'
import { HTML2TEXT } from '@/util/tool.js'

import { companyGet } from '@/requests/api/company.js'
export default {
  name: '',

  data () {
    return {
      job:{},
      company:{}
    }
  },
  
  mounted(){
    jobGet(this.$route.params.id).then(data=>{
      // console.log(data)
      this.job = data.data;
      //如果有查公司
      companyGet(this.job.company_id).then(data=>{
        this.company = data.data
      }).catch(e=>{})
    }).catch(e=>{})

  },

  methods: {
    HTML2TEXT
  },

  components: {
    'job':JobMiddleCard
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
@import "@/style/var.scss";
  .job-detail{
    
    .article{
      width: $container-width;
      margin:0 auto;
      display: flex;
      justify-content:space-between;
      padding: 30px 0;

      & > .content{
        margin-right: 20px;
        width: 750px;
      }
      .aside{
        width: 350px;
        padding: 30px 20px;
        // border-left: 1px solid $border1;
        margin-top: 20px;
        box-shadow: 0 0 5px #ddd;
        .company-description{
          color:$font2;
        }
        .jobs{
          margin-top: 40px;
          .title{
            font-size: 18px;
          }
          .job-middle-card{
            .title{
              // padding: 0;
              margin: 0;
              margin-bottom: 10px;
            }
          }
        }
        h2,h3{
          text-align: center;
          color:$font1;
          margin: 20px 0;
        }
        h2{
          &:hover{
            color:$blue;
          }
        }
        h3{
          font-weight: bold;
        }
        .logo{
          img{
            // border: 1px solid $border1;
            // border-radius: 100%;
            display: block;
            margin:0 auto;
            max-width: 150px;
            max-height: 150px;
          }
        }
      }
    }
    
    .header{
      background-color: $bgc3;
      // display: flex;
      // justify-content:space-between;
      .inner{
        width: $inner-width;
        margin:0 auto;
        padding: 50px 0;
        display: flex;
        justify-content:space-between;

        .left{
          
        }
      }
      .title{
        color: $font1;
        font-size: 36px;
        margin-bottom: 10px;
      }
      .middle{
        font-size: 22px;
        color: $font2;
        margin-bottom: 10px;
        &>span:nth-child(n+2):before{
          content: "/";
          margin: 0 5px;
          display: inline-block;
        }

        .salary{
          color:$danger;
        }
      }
      .publish{
        color:$font3;
      }
    }
  }
</style>