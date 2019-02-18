<template>
  <div class="main">
    <div class="search-box" ref="ssearch">
      <s-search 
        v-model="keywords" 
        placeholder="搜索职位、公司或地点" 
        @enter="search()"
        style="width: 800px;"

      />
    </div><!-- search-box-->
    

    <div class="result" ref="result">
      <div class="result-inner">
        <filter-group style="margin-bottom: 30px">
          <filter-item 
             v-for="(item,index) in filter_init"
             :title="item.title" 
             :row='index' 
             :list="item.data" 
             @click="filter($event);repeat_to_choose=false"
             @repeat="repeat_to_choose = true"
             />
        </filter-group>

        <div>
          <company
            v-for="(i,index) in companys"
            @detail="$router.push('/company/'+i.id)"
            :key="index"
            :name="i.name"
            :logo="i.logo"
            :city="i.city"
            :is_vip="i.is_vip"
            :is_auth="i.is_auth"
            :province="i.province"
            :description="i.description"
            :jobs_num="i.jobs_num"
            class="company animated fadeIn"
            :class="{'jello':repeat_to_choose}"
            />
        </div>
        <div v-if="companys===false" class="noresult">
          <h2><i class="iconfont icon-noresult" style="margin-right: 20px"></i>暂未找到符合条件的公司</h2>
        </div>
        <div v-if="JSON.stringify(companys)==='[]'" class="result-place">
          <h2></h2>
        </div>
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="current_page"
            layout="prev, pager, next"
            @current-change="turnPage($event)"
            :page-size="12"
            :total="total">
          </el-pagination>
        </div>
      </div><!-- result-inner -->
    </div><!-- result -->
  </div><!-- main -->


  
</template>

<script>
// import CompanyItem from '@/@components/CompanyItem.vue'
import FilterGroup from '@/components/filter/FilterGroup.vue'
import FilterItem from '@/components/filter/FilterItem.vue'
import Ssearch from '@/components/input/Ssearch.vue'
import CompanyMiddleCard from '@/@components/Company/CompanyMiddleCard.vue'

import { jsonToUrl } from '@/util/tool.js'
import { companyList } from '@/requests/api/company.js'

export default {
  name: 'Company',

  data () {
    return {
      repeat_to_choose:false,
      keywords:'',
      companys:[],
      total:0,
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
      ],

      current_page:1,
      filter_arr:{

      },
    }
  },
  
  methods: {
    turnPage(e){
      let params = JSON.parse(JSON.stringify(this.filter_arr));
      params['page'] = e;
      this.getData(params);
    },
    getData(params){
      let res = this.$refs.result;
      this.companys=[];
      this.$refs.ssearch.scrollIntoView();
      companyList(params).then(data=>{
        this.total = data.data.count;
        if (this.total===0) {
          this.companys=false;
          return;
        }
        delete data.data.count;
        this.companys=data.data;


      }).catch(e=>{})
    },
    filter(arr){
      //[row,column]
      // console.log(arr);return 
      this.current_page = 1;
      let row = arr.row,
          col = arr.col;
      if (col === 0) {
        delete this.filter_arr[this.filter_init[row]['value']];
      }else{
        this.filter_arr[this.filter_init[row]['value']] = this.filter_init[row]['data'][col];
      }

      this.getData(this.filter_arr);
    },
    tell(e){
      console.log(e)
    },
    search(){
      // console.log(123456789)
      let to = '/search/company'+jsonToUrl({keywords:this.keywords})
      this.$router.push(to)
    },
  },
  mounted(){
    this.getData(false);
  },

  components: {
    // 'company-item':CompanyItem,
    'filter-group':FilterGroup,
    'filter-item':FilterItem,
    's-search':Ssearch,
    'company':CompanyMiddleCard
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  @import "@/style/var.scss";
  .result-place{
    height: 300px;
  }
  .noresult{
    margin: 150px auto;
    text-align: center;
    h2,i{
      color: $font3;
    }
    i{
      font-size: 40px;
    }
  }
  .main{
    // .container{
    //   width: 1200px;
    //   margin: 0 auto;
    // }
    .company{
      margin-left: 16px;
      margin-bottom: 16px;
      &:nth-child(4n+1){
        margin-left: 0;
      }
    }
  }
  // .pagination{
  //   background-color: #fff;
  //   width: 100%;
  //   display: flex;
  //   justify-content:center;
  //   padding: 30px 0 60px;
  // }
</style>