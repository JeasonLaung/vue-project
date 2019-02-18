<template>
  <div class="main search-page">
  	<div class="search-box">
        <!-- <el-input placeholder="搜索职位、公司或地点" v-model="keywords" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" class="search-button" @click="search()">搜索</el-button>
        </el-input> -->
        <s-search 
          v-model="keywords" 
          placeholder="搜索职位、公司或地点" 
          @enter="search()"
          style="width: 800px;"
        />
    </div>
    <div class="result">
    	<div class="result-inner">
        <div class="type">
          <el-badge :value="jobs_num" class="item">
    			  <el-button @click="turnType('job')" :type="$route.name=='search_job'?'primary':''">职位</el-button>
          </el-badge>
          <el-badge :value="companys_num" class="item">
    			  <el-button @click="turnType('company')" :type="$route.name=='search_company'?'primary':''">公司</el-button>
          </el-badge>
    		</div>
    		<div v-if="$route.name=='search_job'">
          <filter-group style="margin-bottom:20px;width: 900px;">
            <filter-item 
               v-for="(item,key) in filter_init"
               :title="item.title" 
               :row='key' 
               :list="item.data" 
               @click="filter"
               />
          </filter-group>
    			<job
            v-for="(i,index) in jobs"
            :key="index"
            v-if="i.company"
    			  style="margin-bottom: 20px;"
    			  :company="i.company.name"
    			  :job_name="i.title"
    			  :list="[i.experience,i.min_degree||i.degree]"
    			  :publish="i.create_time"
    			  :labels="i.labels"
    			  :city="i.city"
    			  :province="i.province"
            :logo="i.company.logo"
    			  :max_salary="i.max_salary"
            :min_salary="i.min_salary"
            :is_vip="i.company.is_vip"
            :is_auth="i.company.is_auth"

    			  :welfare="i.company.labels == false ? '' : '“'+i.company.labels.map(v=>v.name).join(',')+'”'"
    			 />
          <div style="display: flex;justify-content: center;width: 800px;">
            <el-pagination
              :current-page.sync="current_page"
              @current-change="turnPage($event)"
              background
              :page-size="10"
              layout="prev, pager, next"
              :total="jobs_num">
            </el-pagination>
          </div>
          
    		</div>
        <div v-if="$route.name=='search_company'">
          <company
              v-if="$route.name=='search_company'"
              class="company-layout"
              v-for="i in companys"
              :name="i.name"
              :province="i.province"
              :city="i.city"
              :description="i.description"
              :logo="i.logo"
              :jobs_num="i.jobs_num"
              :comments_num="6"
              :is_vip="i.is_vip"
              :is_auth="i.is_auth"

           />
          <div style="display: flex;justify-content: center;">
            <el-pagination
              :current-page.sync="current_page"
              @current-change="turnPage($event)"
              background
              :page-size="12"
              layout="prev, pager, next"
              :total="companys_num">
            </el-pagination>
          </div>
        </div>

    	</div>
    	
    </div>
  </div>
</template>

<script>
import JobLargeCard from '@/@components/Job/JobLargeCard.vue'
import CompanyMiddleCard from '@/@components/Company/CompanyMiddleCard.vue'
import Ssearch from '@/components/input/Ssearch.vue'
import { jsonToUrl,deepCopy } from '@/util/tool.js'
import { jobList } from '@/requests/api/job.js'
import { companyList } from '@/requests/api/company.js'
import FilterGroup from '@/components/filter/FilterGroup.vue'
import FilterItem from '@/components/filter/FilterItem.vue'
export default {
  name: 'Search',

  data () {
    return {
      keywords:'',
      jobs:[],
      companys:[],
      jobs_num:0,
      companys_num:0,
      current_page:1,
      filter_init:[
        {
          title:"公司地点",
          value:"city",
          data:[
            "不限",
            "北京",
            "上海",
            '广州',
            '深圳',
            '武汉',
            '重庆',
            '成都',
            '南京',
            '佛山'
          ],
        },
        {
          title:"经验要求",
          value:"experience",
          data:[
            '不限',
            {title:'3年以下',value:'1,2'},
            {title:'3-5年',value:'3'},
            {title:'5年以上',value:'4,5'},
          ]
        },
        {
          title:"学历要求",
          value:"degree",
          data:[
            '不限',
            {title:'高中',value:'1'},
            {title:'大专',value:'2'},
            {title:'本科',value:'3'},
            {title:'研究生及以上',value:'4+'},
          ]
        },
        {
          title:"薪资范围",
          value:"salary",
          data:[
            '不限',
            {title:'0k-3k',value:'0-3'},
            {title:'3k-5k',value:'3-5'},
            {title:'5k-10k',value:'5-10'},
            {title:'10k-15k',value:'10-15'},
            {title:'15k+',value:'15+'},
          ]
        }
        // "公司地点":[
        //   '不限',
        //   {
        //     title:'北京',
        //     value:1000
        //   },
        //   '上海',
        //   '广州',
        //   '深圳',
        //   '武汉',
        //   '重庆',
        //   '成都',
        //   '南京',
        //   '佛山'
        // ],
        // "经验要求":[
        //   '不限',
        //   '3年以下',
        //   '3-5年',
        //   '5年以上',
        // ],
        // "学历要求":[
        //   '不限',
        //   '高中及以下',
        //   '大专',
        //   '本科',
        //   '硕士',
        // ],
        // "薪资范围":[
        //   '不限',
        //   '0k-3k',
        //   '3k-5k',
        //   '5k-10k',
        //   '10k-15k',
        //   '15k+',
        // ],
      ],
      filter_arr:{

      },
    }
  },
  
  methods: {
    jsonToUrl,
    filter(arr){
      //[row,column]
      let row = arr.row,
          col = arr.col;
      if (col === 0) {
        delete this.filter_arr[row];
      }else{
        this.filter_arr[row] = col;
      }
      let param_name,param_value;
      let query_json={}
      for(var i in this.filter_arr){
        // param_name  = this.filter_resolve[i];
        param_name = this.filter_init[i]['value'];
        param_value = this.filter_init[i]['data'][this.filter_arr[i]].value || this.filter_init[i]['data'][this.filter_arr[i]];
        // console.log(param_name,param_value)
        query_json[param_name] = param_value;
      }
      query_json['keywords'] = this.$route.query['keywords'];
      // console.log(query_json)
      //进行请求
      jobList(query_json).then(data=>{
        this.jobs_num = data.data.count
        delete data.data.count
        this.jobs = data.data
      }).catch(e=>{});
    },
    search(){
      // console.log(123456789)
      let to = this.$route.path+"?keywords="+this.keywords
      this.$router.push(to)
    },
    toSearch(){
      this.keywords = this.$route.query.keywords || '';
      // console.log(this.keywords)
      // console.log(jobList)
      jobList(this.$route.query)
      .then(data=>{
         // console.log(data)
        this.jobs=data.data
        this.jobs_num = data.data.count ||0
      }).catch(e=>{
      })
      companyList(this.$route.query)
      .then(data=>{
         // console.log(data)
        this.companys_num = data.data.count ||0
        delete data.data.count
        this.companys = data.data
        
      }).catch(e=>{
      })
    },
    turnType(type){
      this.current_page = 1
      this.$route.query
      if (type == 'job') {
        return this.$route.name!=='search_job'?this.$router.push('./job'+jsonToUrl(this.$route.query)):false
      }else if(type=='company'){
        return this.$route.name!=='search_company'?this.$router.push('./company'+jsonToUrl(this.$route.query)):false
      }
      
    },
    turnPage(e){
      let query = deepCopy(this.$route.query);
      if (this.$route.name=="search_job") {
        query['page'] = e;
        jobList(query)
        .then(data=>{
          this.jobs=data.data
          this.jobs_num = data.data.count
        }).catch(e=>{

        })
      } 
      if (this.$route.name=="search_company") {
        console.log(e)
        query['page'] = e;
        // console.log(query)
        companyList(query)
        .then(data=>{
          this.jobs_num = data.data.count
          delete data.data.count
          this.companys=data.data
        }).catch(e=>{

        })
      } 
    }
  },

  components: {
  	"job":JobLargeCard,
    "company":CompanyMiddleCard,
    's-search':Ssearch,
    'filter-group':FilterGroup,
    'filter-item':FilterItem,
  },
  
  mounted(){

  },

  computed: {
    
  },
  watch: {
    '$route.query': {
      handler(value, old) {
        this.toSearch();
          // this.keywords = this.$route.query.keywords || '';
          // jobList(jsonToUrl(this.$route.query))
          // .then(data=>{
          //   this.jobs=data.data
          //   this.jobs_num = data.data.count
          // }).catch(e=>{

          // })
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
      deep: true
    }
  },
};
</script>

<style lang="scss" scoped="scoped">
	@import "@/style/var.scss";
  .result{
    width: 100%;
    background-color: #fff;
    .result-inner{
      width: $container-width;
      margin:0 auto;
      padding: 0 0 30px;
    }
  }
	.search-page{
		.type{
			margin-bottom: 20px;
      .item{
        margin-right: 30px;
      }
		}
		.result{
			.result-inner{
        .company-layout{
          margin-right: 16px;
          margin-bottom: 16px;
          &:nth-child(4n){
            margin: 0;
          }
        }
			}
		}
	}
</style>