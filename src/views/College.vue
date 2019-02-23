<template>
  <div class="main">
    <div class="search-box" ref="ssearch">
      <s-search style="width:800px"
        placeholder="请输入学校名、地点"
        @enter="search"
        v-model='keywords'
        ></s-search>
      <!-- <el-input placeholder="搜索学校名、地点" v-model="keywords" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" class="search-button">搜索</el-button>
      </el-input> -->

      <!-- <div class='hot-keywords'>
        热门搜索：
        <ul>
          <li>齐家网</li>
          <li>齐家网</li>
          <li>齐家网</li>
          <li>齐家网</li>
          <li>齐家网</li>
        </ul>
      </div> -->
    </div><!-- search-box-->
    <div class="result">
      <div class="result-inner">
        <div v-if='JSON.stringify(colleges)=="[]"' style="height: 600px;"></div>
        <college
          v-if=""
          v-for="c in colleges"
          :city="c.city"
          :name="c.name"
          :province="c.province||''"
          :student_num="c.student_num"
          :major_num="c.major_num"
          :logo="c.logo"
          class='college'
          @detail="$router.push('/college/'+c.id)"
          />
        <div v-if="colleges===false||JSON.stringify(colleges)=='{}'" class="noresult">
          <h2><i class="iconfont icon-noresult" style="margin-right: 20px"></i>暂未找到符合条件的学校</h2>
        </div>
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="current_page"
            layout="prev, pager, next"
            @current-change="turnPage($event)"
            :page-size="pageSize"
            :total="total"
            >
          </el-pagination>
        </div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import CollegeItem from '@/@components/CollegeItem'
import Ssearch from '@/components/input/Ssearch'
import { collegeList } from '@/requests/api/college.js'
export default {
  name: '',

  data () {
    return {
      keywords:'',
      colleges:[],
      total:0,
      pageSize:12,
      current_page:0
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(page){
      let a;
      if (!page) {
        a = collegeList({page:1,keywords:this.keywords});
      }else{
        a = collegeList({page,keywords:this.keywords});
      }
      a.then(data=>{
        this.total = data.data.count;
        delete data.data.count;
        this.colleges = data.data
      }).catch(e=>{})
    },
    search(keywords){
      // console.log(keywords)
      this.current_page = 1
      this.getData()

    },
    turnPage(page){
      this.$refs.ssearch.scrollIntoView();
      this.getData(page)
    }
  },

  components: {
    'college':CollegeItem,
    's-search':Ssearch
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  .colleges{
    // margin: 
  }
  .college{
    display: inline-block;
    margin-right: 16px;

    &:nth-child(4n){
      margin-right: 0;
      margin-bottom: 16px;
    }
  }
  .pagination{
    margin: 0 auto;
    text-align: center;
    margin: 30px auto 60px;
  }
</style>