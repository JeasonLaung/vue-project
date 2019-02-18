<template>
  <div class="page">
     <div class="container">
      <div class="resume" v-if="!!company">
        <i class="el-icon-star-off special"></i>
        <div class="header">

          <div class="article">
            <div class="face">
              <img src="@/assets/logo.png" alt="">
            </div><!-- face -->
            <div class="info">
              <h2>
                <span style="z-index: 2">{{ company.name }} 
                  
                </span>
                <i style="z-index:1;" slot='right' class="el-icon-edit-outline a" @click="info_dialogVisible = true"/>
              </h2>
              <p>
                <i class="el-icon-location-outline"></i>{{company.province}} {{company.city}}
              </p>
              <p class="connect">
                <i class="el-icon-mobile-phone"> 18680026210</i> 
                <i class="el-icon-message"></i> 605251963@qq.com
              </p>
            </div>
          </div><!-- article -->

        </div><!-- header -->

        <div class="list">
          <cake title="公司简介">
            <i slot='right' class="el-icon-edit-outline a" @click="description_dialogVisible = true"/>
            <p style="margin-top: 20px;" v-html="company.description"> </p>
          </cake>
          <cake title="公司照片">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="pic_dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
           </cake>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import { companyGet } from '@/requests/api/company.js';
import MoonCake from '@/components/cake/MoonCake.vue';
import CakeCard from '@/components/cake/CakeCard.vue';
export default {
  name: '',

  data () {
    return {
      company:null,
      info_dialogVisible:false,
      pic_dialogVisible:false,
      dialogImageUrl: '',
    }
  },
  mounted(){
    companyGet(13).then((data)=>{
      this.company = data.data
    })
    // console.log(this.$user.get('company_id'))
  },
  methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
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