<template>
  <div class="detail">
    <div class="inner-detail">
      <div class="header">
        <div class="company-big-card">
          <div class="company-logo">
            <img :src="company.logo" :alt="company.name" class="logo">
          </div>
          <div class="right">
            <div class="top">            
              <div class="company-name">
                <h2>{{company.name}}</h2>
                <!-- <i>😊</i> -->
                <!-- <el-button>😊默认按钮</el-button> -->
                <company-tag
                  style="margin-left: 20px;"
                  size="25px"
                  :is_vip="company.is_vip"
                  :is_auth="company.is_auth"
                 />
              </div>
              <!-- <div class="discription">{{company.description}}</div> -->
            </div>
            <ul>
              <li>
                <span class="data"><span class="num">4</span> 个</span>
                <span class="text">招聘职位</span>
              </li>
              <li>
                <span class="data"><span class="num">待开发功能</span> 个</span>
                <span class="text">面试评价</span>
              </li>
              <li>
                <span class="data"><span class="num">待开发功能</span></span>
                <span class="text">简历处理率</span>
              </li>
              <li>
                <span class="data"><span class="num">待开发功能</span></span>
                <span class="text">最近访问</span>
              </li>
            </ul>
          </div>
        </div><!-- company-big-card -->
        <tab>
          <tab-item :to="'/company/'+$route.params.id">公司主页</tab-item>
          <tab-item :to="'/company/'+$route.params.id+'/jobs'">招聘岗位</tab-item>
          <tab-item :to="'/company/'+$route.params.id+'/question'">提问公司</tab-item>
        </tab><!-- tab -->
      </div><!-- header -->
      <div class="view">
        <div class="left">
          <router-view :company="company" :extra="extra" v-if="JSON.stringify(company)!='{}'"/>
        </div>
        <div class="right">

          <ul>
            <h3>类似公司</h3>
            <li>
              <img src="@/assets/logo.png"/>
              <div class="about">
                <h3>嘻嘻里 😊</h3>
                <p>嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里</p>
              </div>
            </li>
            <li>
              <img src="@/assets/logo.png"/>
              <div class="about">
                <h3>嘻嘻里 😊</h3>
                <p>嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里嘻嘻里</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// import Tab from '@/components/Tab/Tab.vue'
import { companyGet } from '@/requests/api/company.js'

import CompanyTag from '@/@components/Icon/CompanyTag.vue'
export default {
  name: '',

  data () {
    return {
      company:{},
      extra:{}
    }
  },
  
  method: {
    
  },
  mounted(){
    // console.log(this.$route)
      companyGet(this.$route.params.id).then(data=>{
        this.company = data.data
      }).catch(e=>{})
  },
  components: {
    // 'tab':Tab
    'company-tag':CompanyTag
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>


<style lang="scss" scoped="scoped">
  @import "@/style/var.scss";
  .inner-detail{
    min-width: $container-width;
    width: $container-width;
    margin:0 auto;
  }
  .view{
    padding: 30px 0;
    display: flex;
    justify-content:space-between;
    .left{
      // width: 800px;
      flex:1;
      padding-right: 20px;
    }
    .right{
      h3{
        color: $font1;
        margin-bottom: 20px;
      }
      padding-left: 20px;
      border-left: 1px solid $border1;
      // width: 300px;
      ul{
        padding:0;
        margin: 0;
        padding: 0 20px; 
        li{
          padding-bottom: 10px;
          height: 80px;
          overflow: hidden;
          display: flex;
          align-items:center;
          border-bottom: 1px solid $border1;
          &:nth-child(2){
            border-top: 1px solid $border1;
          }
          img{
            max-width: 50px;
            max-height: 50px;
            margin-right: 10px;

          }
          .about{
            h3{
              margin-bottom: 10px;
              font-size: 17px;
            }
            p{
              width: 200px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow:ellipsis;
            }
          }

          
        }
      }
      width: 300px;
    }
  }
  .header{
    width: 100%;
    // background-color: $bgc2;
    margin-top: 80px;
    .company-big-card{
      background-color: #fff;
      display: flex;
      height: 150px;
      // width: 800px;
      border:1px solid $border1;
      border-right: none;
      .company-logo{
        height:150px;
        width:150px;
        display: flex;
        justify-content:center;
        align-items:center;
      }
      .logo{
        max-height: 100px;
        max-width: 100px;
      }
      .right{
        flex:1;
        // width: 700px;
        display: flex;
        flex-direction:column;
        border-left: 1px solid $border1;
        border-right: 1px solid $border1;

        .top{
          padding:15px 20px 5px;
          margin-bottom: 10px;
          .company-name{
            font-size: 22px;
            color:$font1;
            margin: 5px 0;
            h2{
              font-weight: normal;
            }
            
          }
          & >div{
            display: flex;
          }
          .discription{
            overflow: hidden;
            white-space: nowrap;
            text-overflow:ellipsis;
            font-size: 14px;
            margin-top: 5px;
            color: $font3;
          }
        }
        & > ul{
          flex:1;
          margin: 0;
          display: flex;
          text-align: left;
          border-top: 1px solid $border1;
          // height: 80px;
          background-color: $bgc2;
          padding: 0;
          
          li{
            width: 120px;
            border-right: 1px solid $border1;
            display: flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            color: $font3;
            .data{
              color: $font2;
              .num{
                color:$success;
                font-size: 17px;
              }
            }
            .text{
              margin-top: 2px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
</style>