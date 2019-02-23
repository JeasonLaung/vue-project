<template>
  <div class="main">
    <div class="search-box">
      <!-- <el-input placeholder="搜索职位、公司或地点" v-model="keywords" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" class="search-button" @click="search">搜索</el-button>
      </el-input> -->
      <s-search 
        v-model="keywords" 
        placeholder="搜索职位、公司或地点" 
        @enter="search()"
        style="width: 800px;"
        />
      <div class='hot-keywords'>
        热门搜索：
        <ul>
          <li class="a" v-for="(i,index) in hot_search" :key="index" @click="$router.push('/search/job?keywords='+i.title)">
            {{i.title}}
          </li>
          <!-- <li>储备店长</li>
          <li>储备店长</li>
          <li>储备店长</li>
          <li>储备店长</li>
          <li>储备店长</li> -->
        </ul>
      </div>
    </div>
    <div class="article">
      <div class="job-container">
        
        <div class="navbar">
          <ul>
            <li :class="{'active':navbarIndex==0}" @click='navbarIndex=0'>热门职位</li>
            <li :class="{'active':navbarIndex==1}" @click='navbarIndex=1'>最新职位</li>
            <li :class="{'active':navbarIndex==2}" @click='navbarIndex=2' >推荐职位</li>
          </ul>
        </div>
        <div style="height: 650px" v-if="jobs==false">
          
        </div>
        <div class="jobs animated fadeIn" v-if="jobs!=false">
          <ul>
            <li v-for="(i,index) in jobs" :key="index" v-if="i.company">
              <div class="item">
                <div class="top">
                  <div>
                    <span class="title-text a" @click="$router.push('/job/'+i.company.id)">
                      {{i.title}}
                    </span>
                    <span class="push-time">
                      [{{i.create_time.split(' ')[0]}}发布]
                    </span>

                    <!-- <i class="iconfont icon-vip"></i> -->
                    <company-tag
                      :is_vip="i.is_vip"
                      :is_auth="i.is_auth"
                      size="18px;"
                      />
                </p>
                  </div>
                  <span class="salary">
                    {{i.min_salary + '-' + i.max_salary + 'k'}}
                  </span>
                </div>
                <div class="demand">
                  <span>{{i.experience ? i.experience : '经验不限'}}</span>
                  <span>{{i.degree ? i.degree : '学历不限'}}</span>
                </div>
                <div class="labels">
                  <span v-for="(a,aindex) in i.labels" :key="aindex" v-if="i.labels!=false">
                    {{a.name}}
                  </span>
                  <span v-if="i.labels==false">
                    ""
                  </span>
                </div>
                <div class="company-info">
                  <img :src="i.company.logo" :alt="i.company.name" class="company-logo a"  @click="$router.push('/company/'+i.company.id)">
                  <div class="company">
                    <span class='company-name a' @click="$router.push('/company/'+i.company.id)">{{i.company.name}}</span>
                    <span class='company-location'>{{i.province + (i.city==i.province?'':i.city)}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="visit-more">
          <button @click="$router.push('/job')">查看更多</button>
        </div>
        <div class="navbar">
          <ul>
            <li class="active">热门企业</li>
          </ul>
        </div>
        <div class="companys">
          <ul>
            <li v-for="(i,index) in companys" :key="index">
              <figure v-if="i instanceof Object">
                <div style="height: 80px;display: flex;align-items:center;">
                  <img :src="i.logo" :alt="i.name" class="logo a" @click="$router.push('/company/'+i.id)"/>
                </div>
                
                <p class="company-name a" @click="$router.push('/company/'+i.id)">{{i.name}}</p>
                <p class="company-type">
                  <company-tag
                    :is_vip="i.is_vip"
                    :is_auth="i.is_auth"
                    size="18px;"
                    />
                </p>
                
                <p class="company-introduce">{{HTML2TEXT(i.description)}}</p>
                <div class="bottom">
                  <div>
                    <span class="num">5</span>
                    <span class="text">面试评价</span>
                  </div>
                  <div>
                    <span class="num">{{i.jobs_num}}</span>
                    <span class="text">在招岗位</span>
                    
                  </div>
                  <div>
                    <span class="num">100%</span>
                    <span class="text">简历处理率</span>
                  </div>
                </div>
              </figure>
            </li>
          </ul>
        </div>
        <div class="visit-more">
          <button @click="$router.push('/company')">查看更多</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ssearch from '@/components/input/Ssearch.vue'
import { jobFix,jobHotSearch,jobHot,jobNew } from '@/requests/api/job.js'
import { companyFix } from '@/requests/api/company.js'
import { HTML2TEXT } from '@/util/tool.js'
import CompanyTag from '@/@components/Icon/CompanyTag.vue'

export default {
  name: 'Job',

  data () {
    return {
      // keywords:'',
      navbarIndex:0,
      keywords:'',
      hot_search:[],
      jobs:[

      ],
      companys:[

      ]
    }
  },

  mounted(){
    jobFix().then(data=>{
      this.jobs = data.data
    }).catch(e=>{
      // this.$alert('网络异常！')
    });
    companyFix().then(data=>{
      this.companys = data.data
    }).catch(e=>{
      // this.$alert('网络异常！')
    });
    jobHotSearch().then(data=>{
      this.hot_search= data.data;
    })
  },
  
  methods: {
    HTML2TEXT,
    search(){
      this.$router.push('/search/job?keywords='+this.keywords)
    },
  },

  components: {
    'company-tag':CompanyTag,
    's-search':Ssearch
  },
  
  computed: {

  },
  watch: {
    navbarIndex(value,old){
      switch(value){
        case 0:
          jobHot().then(data=>{this.jobs=data.data}).catch(e=>{});
          break;
        case 1:
          jobNew().then(data=>{this.jobs=data.data}).catch(e=>{});
          break;
        case 2:
          jobFix().then(data=>{this.jobs=data.data}).catch(e=>{});

      }
    }
  },
};
</script>
 <!-- -->
<style lang="scss">
@import "@/style/var.scss";
$jobs-width:1200px;
$space-width:15px;
$job-row:3;
$company-row:4;
$job-width:($jobs-width - $space-width * $job-row)/$job-row;
$company-width:($jobs-width - $space-width * $company-row)/$company-row;
$job-height:200px;
// $job-width:calc(($jobs-width-$space-width*3)/3;
li{
  list-style: none;
}
.a{
  color: $font1;
  cursor: pointer;
  &:hover{
    color: $blue;
  }
}
.el-popover{

  .iconfont{
    font-size: 30px;
    margin-right: 10px;
  }
}
.visit-more{
  
  display: flex;
  justify-content:center;
  &:last-child{
    margin-bottom: 100px;
  }
  button{
    background-color: transparent;
    font-size:16px;
    margin: 0;
    padding: 10px 150px;
    border: 1px solid #409EFF; 
    color:#409EFF;
    outline: none;
    transition:background-color .5s;
    &:hover{
      background-color: #409EFF;
      color: #fff;
    }
  }
}
.clearfix:after{
  clear: both;
  display: block;
  content: "";
}
  .main{
    background-color: #fafafa;
    /*background-color: #111;*/
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
  }
  .search-box{
    margin: 25px;
  }
  .article{
    background-color: #fff;
    width: 100%;
      .navbar{
        // width: 300px;
        // margin-top: 30px;
        cursor: default;
        align-items:center;
        font-size: 16px;
        height: 60px;
        line-height: 58px;
        border-bottom: 1px solid #dedede;
        box-sizing:border-box;
        color:#999;
        ul{
          display: flex;
          justify-content:space-between;
          width: 300px;
          li{
            list-style: none;
            &.active{
              color: #333;
              box-sizing:border-box;
              border-bottom: 2px solid #333;
            }/*active*/
          }/*li*/
        }/*ul*/
      }/*navbar*/
    .job-container{
      width: $jobs-width;
      margin: 0 auto;
      .companys{
        padding: 20px 0;

        ul{
          display: flex;
          flex-wrap:wrap;
          justify-content:space-between;
          li{
            // overflow: hidden;
            height: 270px;
            overflow: hidden;
            text-overflow:ellipsis;
            width: $company-width;
            border: 1px solid #ddd;
            &:hover{
              box-shadow: 0 0 8px #ddd,0 0 8px rgba(6, 216, 190,.1);
            }
            &:nth-of-type(4n+3){
              margin-bottom: $space-width;
            }
            // &:nth-of-type(4n+3){
            //   margin: 0 $space-width $space-width;
            // }
            figure{
              padding: 20px 18px;
              .logo{
                display: block;
                margin: 0 auto;
                max-width: 80px;
                max-height: 80px;
              }/*logo*/
              .company-name{
                text-align: center;
                margin: 8px 0;
                white-space: nowrap;
                // max-width: 200px;

              }/*company-name*/
              .company-type{
                color:#999;
                margin: 5px 0;
                font-size: 14px;
                text-align: center;
                i{
                  font-size: 20px;
                  margin: 0 5px;
                }
              }/*company-type*/
              .company-introduce{
                margin: 5px 0;
                font-size: 14px;
                padding-bottom: 15px;
                border-bottom: 1px dashed #ddd; 
                color:#888;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }/*company-introduce*/
              .bottom{
                display: flex;
                justify-content:space-between;
                align-items:center;
                height: 60px;
                div{
                  display: flex;
                  flex-direction:column;
                  text-align: center;
                  border-right: 1px solid #e2e2e2;
                  &:last-child{
                    border-right:none;
                  }
                  padding: 0 10px;
                  .num{
                    color:#67C23A;
                    margin-bottom: 5px;
                  }
                  .text{
                    color: #999;
                    font-size: 14px;
                  }
                }
              }

            }/*figure*/
            
          }/*li*/
        }/*ul*/
      }/*company*/
      .jobs{
        padding: 20px 0;
        ul{
          display: flex;
          justify-content:space-between;
          flex-wrap:wrap;

          li{
            overflow: hidden;
            min-width: $job-width;
            height: $job-height;
            border: 1px solid #ddd;
            &:hover{
              box-shadow: 0 0 8px #ddd,0 0 8px rgba(6, 216, 190,.1);
            }
            &:nth-of-type(#{$job-row}n+2){
              margin: 0 $space-width $space-width;
            }
            .item{
              padding: 20px 18px 0;
              // line-height: 1.8;
              .top{
                line-height: 1.5;
                display: flex;
                justify-content:space-between;
                .title-text{
                  font-size: 17px;
                }
                .push-time{
                  font-size: 14px;
                  color: #888;
                }
                .salary{
                  font-size: 17px;
                  color: #fa6041;
                }
              }
              .demand{
                font-size: 15px;
                color: #888;
                line-height: 30px;
                height: 30px;
                span{
                  &:first-child:before{
                    display: none;
                  }
                  &:before{
                    content: "/";
                    display: inline-block;
                    padding: 0 5px;
                  }
                }
              }/*demand*/
              .labels{
                // height: 30px;
                padding:10px 0 20px;
                border-bottom: 1px dashed #ddd; 
                span{
                  font-size: 13px;
                  color: #aaa;
                  padding: 5px 15px;
                  border: 1px solid #ccc;
                  box-sizing:border-box;
                  margin-right: 10px;
                  border-radius: 3px;
                }

              }/*labels*/
              .company-info{
                display: flex;
                // line-height: 70px;
                height: 70px;
                align-items:center;
                .company{
                  display: flex;
                  
                }
                .company-logo{
                  max-height: 60px;
                  max-width: 60px;
                }
                .company{
                  display: flex;
                  flex-direction:column;
                  margin-left: 15px;
                  .company-location{
                    font-size: 14px;
                    color:#999;
                  }/*company-location*/
                }
                .company-name{
                  font-size: 16px;
                  max-width: 250px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow:ellipsis;
                }/*company-name*/
                
              }/*company-info*/
            }
          }
        }
      }
    }
  }
  .hot-keywords{
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    ul{
      display: inline-block;
      li{
        list-style: none;
        display: inline;
        color:#409EFF;
        margin-right:15px;
      }
    }
  }
  .input-with-select{
    width: 800px;
    margin:0 auto;
    box-sizing: border-box;
  }
  .search-button{
    background-color: #409EFF !important;
    color: #fff !important;
    border-radius: 0 4px 4px 0 !important;
    border: 10px solid #409EFF;
    box-sizing: border-box;
  }

</style>