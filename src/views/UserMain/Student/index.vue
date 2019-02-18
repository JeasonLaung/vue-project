<template>
  <div class="page">
    <div class="dialog">
      <el-dialog title="编辑个人信息" center :visible.sync="info_dialogVisible" v-if="JSON.stringify(info_form)!='{}'">
        <el-form :model="info_form">
          <el-form-item label="姓名" :label-width="'80px'">
            <el-input v-model="info_form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别"  :label-width="'80px'">
            <el-select v-model="info_form.gender" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作经验"  :label-width="'80px'">
            <el-select v-model="info_form.experience" placeholder="请选择经验">
              <el-option :label="i+'年'" :value="i" v-for="i in 5">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历"  :label-width="'80px'">
            <el-select v-model="info_form.degree" placeholder="请选择学历">
              <el-option :label="i" :value="index" v-for="(i,index) in ['高中','大专','本科','研究生']">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出生日期"  :label-width="'80px'">
            <el-date-picker
              v-model="info_form.birthday"
              align="right"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="reset();info_dialogVisible = false;">取 消</el-button>
          <el-button type="primary" @click="info_dialogVisible = false;studentSetInfo(info_form).then(data=>{$user.update(info_form);}).catch(e=>{})">确 认</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑个人简介" center :visible.sync="description_dialogVisible" v-if="JSON.stringify(description_form)!='{}'">
        <el-form :model="description_form">
          <el-form-item label="个人简介">
            <!-- <el-textarea></el-textarea> -->
            <el-input
              type="textarea"
              placeholder="请输入简介"
              v-model="description_form.description"
              :rows="7"
              resize="none"
              maxlength="500"
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="reset();description_dialogVisible = false;">取 消</el-button>
          <el-button type="primary" @click="description_dialogVisible = false;studentSetDescription(description_form).then(data=>{$user.update(description_form);}).catch(e=>{})">确 认</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加工作经历" center :visible.sync="experience_dialogVisible" v-if="JSON.stringify(experience_form)!='{}'">
        <el-form :model="description_form">
          <el-form-item label="公司名称" :label-width="'80px'">
            <el-input
              placeholder="请输入公司名称"
              v-model="experience_form.company_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位名称" :label-width="'80px'">
            <el-input
              placeholder="请输入岗位名称"
              v-model="experience_form.position_name"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位描述" :label-width="'80px'">
            <el-input
              type="textarea"
              placeholder="请输入岗位描述"
              v-model="experience_form.description"
            ></el-input>
          </el-form-item>
          <el-form-item label="就职时间"  :label-width="'80px'">
            <el-date-picker
              v-model="d"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="reset();experience_dialogVisible = false;">取 消</el-button>
          <el-button type="primary" @click="experience_dialogVisible = false;studentSetDescription(experience_form).then(data=>{$user.update(experience_form);}).catch(e=>{})">确 认</el-button>
        </div>
      </el-dialog>
    </div><!-- dialog -->
  














    <div class="container">
      
    
      <div class="resume">
        <i class="el-icon-star-off special"></i>
        <div class="header">

          <div class="article">
            <div class="face">
              <img src="@/assets/logo.png" alt="">
            </div><!-- face -->
            <div class="info">
              <h2>
                <span>{{resume['name']}} <i class="iconfont icon-male"></i></span>
                <i style="z-index:1;" slot='right' class="el-icon-edit-outline a" @click="info_dialogVisible = true"/>
              </h2>
              <p>
                {{resume['experience'] ? resume['experience'] + '年' : '无'}}工作经验 
                {{' / '+(['高中','大专','本科','研究生'])[resume['degree']]}} 
                {{resume['birthday'] ? ' / ' + ((new Date().getFullYear())-resume['birthday'].split('-')[0]) + '岁' : ''}}
              </p>
              <p class="connect">
                <i class="el-icon-mobile-phone"> 18680026210</i> 
                <i class="el-icon-message"></i> 605251963@qq.com
              </p>
            </div>
          </div><!-- article -->

        </div><!-- header -->

        <div class="list">
          <cake title="自我描述">
            <i slot='right' class="el-icon-edit-outline a" @click="description_dialogVisible = true"/>
            <el-tag
              style="margin-right: 10px;"
              v-for="(i,index) in resume['labels']"
              :key="index"
            >{{i.name}}</el-tag>
            <p style="margin-top: 20px;">{{ resume['description'] }}</p>
          </cake>
          <cake title="工作经历">
            <i slot='right' class="el-icon-circle-plus-outline a"/>
            <cake-card v-for="i in 2"
              class="card"
              name="公司公司公司公司1"
              from="2018-06-06"
              to="2019-06-06"
              description="岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介"
              position="岗位岗位岗位"
             />

                <!-- <div class="header">
                  <div class="header-top">
                    <h4 class="title">公司公司公司公司{{i}} <span>2018-12-12 至 2019-01-07</span> </h4>
                    <i slot='right' class="el-icon-edit-outline a"/>
                  </div>
                  <p class="position">岗位名{{i}}</p>
                </div>
                <p class="description">
                  岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介岗位简介
                </p> -->
          </cake>
          <cake title="教育经历">
            <i slot='right' class="el-icon-circle-plus-outline a"/>
            <cake-card v-for="i in 2"
              class="card"
              name="学校学校学校1"
              from="2018-06-06"
              to="2019-06-06"
              description="教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介教育简介"
              degree="学历"
              major="专业"
             />
          </cake>
          <cake title="项目经历">
            <i slot='right' class="el-icon-circle-plus-outline a"/>
            <cake-card v-for="i in 2"
              class="card"
              name="项目项目1"
              from="2018-06-06"
              to="2019-06-06"
              description="项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介项目简介"
             />
          </cake>
        </div>
      </div><!-- resume -->
      <div class="expect">
        <div class="article">
          <h1 class="title"><span>期待</span> <i slot='right' class="el-icon-edit a"/></h1>
          <p>期待工作薪资：5000-6000 </p>
          <p>期待工作城市：北京</p>
          <p>期待工作岗位：程序员</p>
        </div>
        
        <div class="bottom">
          <i class="el-icon-star-off"></i>
        </div>
      </div><!-- expect -->
    </div>
  </div>
</template>

<script>
import MoonCake from '@/components/cake/MoonCake.vue'
import CakeCard from '@/components/cake/CakeCard.vue'
import { studentSetInfo,studentSetDescription } from '@/requests/api/student.js'
export default {
  name: '',

  data () {
    return {
      d:'',
      resume:false,
      info_form:{
        'name':'',
        'experience':'',
        'birthday':'',
        'degree':'',
        'gender':''
      },
      info_dialogVisible:false,
      description_form:{
        'description':''
      },
      description_dialogVisible:false,
      experience_form:{
        'company_name':'',
        'position_name':'',
        'description':'',
        'from':'',
        'to':'',
      },
      experience_dialogVisible:false
    }
  },
  
  methods: {
    studentSetInfo,
    studentSetDescription,
    // changeGender(e){
    //   // this.$set(this.info_form['gender'],e)
    //   console.log(e)
    // },
    copy(a,b,arr){
      for (var i = 0; i < arr.length; i++) {
        a[arr[i]] = b[arr[i]] == null || !b[arr[i]] ? '' : b[arr[i]];
      }
    },
    reset(){
      this.copy(this.info_form,this.resume,['name','experience','birthday','degree','gender'])
      this.copy(this.description_form,this.resume,['description'])
    },
    updateResume(){
      this.resume = this.$store.state.USER_INFO;
    }
  },
  
  mounted(){
    this.resume = this.$user.getInfo()
    this.reset()
    // this.info_form['name'] = this.resume['name'] || ''
    // this.info_form['experience'] = this.resume['experience']
    // this.info_form['birthday'] = this.resume['birthday']
    // this.info_form['birthday'] = this.resume['birthday']
  },
  components: {
    'cake':MoonCake,
    'cake-card':CakeCard,
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped="scoped">
@import "@/style/var.scss";
  .page{
    // overflow: auto;
    // width: 100%;
    padding: 40px 0;
    // display: flex;
    // width: 1000px;
    margin: 0 auto;
    &>.container{
      display: flex;
    }
  }
  .el-select{
    width: 100%;
  }
  .resume{

    width: 700px;
    // margin: 0 auto;
    border-radius: 10px;
    border: 1px solid $border1;
    margin-right: 30px;
    margin-bottom: 40px;
    background-color: #fff;
    position: relative;
    overflow: hidden;
    .el-icon-star-off{
      // opacity: .5;
      position: absolute;
      right: 0;
      font-size: 300px;
      color: #fff;
      transform:rotate(30deg) translateY(-50%);
      z-index:0;
    }
    &>.header{
      background-color: $bgc2;
      padding: 30px;
      margin-bottom: 30px;

    }

    .article{
      width: 600px;
      margin: 0 auto;
      background-color: $bgc2;
      display: flex;
      .info{
        flex:1;
      }
      h2{
        margin-bottom: 15px;
        display: flex;
        justify-content:space-between;
      }
      .connect{
        margin-top:20px;
        font-size: 14px;
        color: $font2;
        i{
          margin: 0 10px; 
          // font-size: 16px;
          &:first-child{
            margin-left: 0;
          }
        }
      }
      .face{
        width: 100px;
        height: 100px;
        border-radius: 100%;
        background-color: #fff;
        overflow: hidden;
        margin-right: 30px;
        img{
          max-width: 100px;
          max-height: 100px;
        }
      }

    }
    .list{
      width: 600px;
      margin: 0 auto;
    }
  }
  .expect{
    // width: 250px;
    border: 1px solid $border1;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
    .article{
      // width: 100%;
      width: 250px;
      border-radius: 10px;
      line-height: 30px;
      padding: 30px 30px 0;
      color: $font1;
    }
    
    .title{
      display: flex;
      justify-content:space-between;
      margin-bottom: 20px;
    }
    .bottom{
      background-color: $bgc1;
      height: 150px;
      text-align: right;
      overflow: hidden;

      .el-icon-star-off{
        font-size: 300px;
        color: #fff;
        transform:rotate(30deg) translateY(-50%);
      }
    }
  }

  
  
  .card{
    padding: 15px;

  }
</style>