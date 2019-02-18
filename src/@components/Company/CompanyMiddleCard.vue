<template>
    <figure class="company-middle-card">
      <div class="vip" v-if="is_vip"></div>
      <div class="auth" v-if="is_auth"></div>
      <!-- <div class="test" v-if="is_auth"></div> -->
      <p class="logo-container">
        <img :src="logo" :alt="name" class="logo a" @click="$emit('detail')"/>
      </p>
      <p>
        <el-popover
          placement="top"
          width="200"
          trigger="hover">
          <p>
            {{name}}
          </p>
          <p slot="reference"  class="company-name a" @click="$emit('detail')">
            {{name}}
          </p>
        </el-popover>
      </p>
      <p class="company-type">
        <i class="el-icon-location-outline"/>
        <span>{{province}}</span>
        <span v-if="city!==province&&city"> , {{city}}</span>
      </p>
        
      <p class="company-introduce">{{HTML2TEXT(description)?HTML2TEXT(description):"暂无公司简介"}}</p>
      
      <div class="bottom">
        <div>
          <span class="num">{{comments_num}}</span>
          <span class="text">面试评价</span>
        </div>
        <div>
          <span class="num">{{jobs_num}}</span>
          <span class="text">在招岗位</span>
          
        </div>
        <div>
          <span class="num">0%</span>
          <span class="text">简历处理</span>
        </div>
      </div>
    </figure>
</template>

<script>
import CompanyTag from '@/@components/Icon/CompanyTag.vue'
import { HTML2TEXT } from '@/util/tool.js'
export default {
  name: 'CompanyMiddleCard',

  data () {
    return {
      keywords:''
    }
  },
  props:{
    logo:{
      default:'',
      type:String
    },
    city:{
      default:'',
      type:String
    },
    province:{
      default:'',
      type:String
    },
    name:{
      default:'',
      type:String
    },
    description:{
      default:'',
      type:String
    },
    comments_num:{
      default:0,
      type:Number
    },
    jobs_num:{
      default:0,
      type:Number
    },
    is_vip:{
      default:0,
      type:[Number,Boolean],
    },
    is_auth:{
      default:0,
      type:[Number,Boolean],
    },
  },
  methods: {
    HTML2TEXT
  },

  components: {
    // "company-tag":CompanyTag
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>
 <!-- -->
<style lang="scss">
// $jobs-width:1200px;
// $space-width:15px;
// $company-row:4;
// $company-width:($jobs-width - $space-width * $company-row)/$company-row;
// $job-width:calc(($jobs-width-$space-width*3)/3;
@import "@/style/var.scss";
      figure{
        
        &.company-middle-card{
          display: inline-block;
          padding: 20px 18px;
          height: 230px;
          width: 250px;
          position: relative;
          border:1px solid $border2;
          // .test{
          //   position: absolute;
          //   background-size: 100%;
          //   background-repeat: no-repeat;
          //   background-position: -75px 0;
          //   top: 0;
          //   left: 0;
          //   width: 150px;
          //   height: 75px;

          //   background-image: url('../../assets/vip_auth.gif');
          // }
          .vip,.auth{
            position: absolute;
            background-size: 190px 95px;
            background-repeat: no-repeat;
            top: -5px;
            width: 95px;
            height: 95px;
            background-image: url('../../assets/vip_auth.gif');
          }
          .vip{
            background-position: -95px 0;
            
            right: -5px;
          }
          .auth{
            background-position: 0 0;
            left: -5px;
          }
          // .vip{
          //   position: absolute;
          //   top: 0;
          //   left: 0;
          //   // background-color: #111;
          //   border-right: 50px solid rgba(230, 162, 60,.8);
          //   border-top: 50px solid transparent;
          //   border-left: 50px solid transparent;
          //   border-bottom: 50px solid transparent;
          //   transform:rotate(45deg) translateX(-75%);

          //   // border:;
          //   // box-shadow: 0px 10px #aaa;
          //   &:before{
          //     color:#fff;
          //     font-size: 30px;
          //     position: absolute;
          //     transform:rotate(-90deg) translate(50%,50%);
          //   }
          // }
          // .auth{
          //   position: absolute;
          //   top: 0;
          //   right: 0;
          //   border-bottom: 50px solid rgba(103, 194, 58,.8);
          //   border-top: 50px solid transparent;
          //   border-left: 50px solid transparent;
          //   border-right: 50px solid transparent;
          //   transform:rotate(45deg) translateY(-75%);
          //   &:before{
          //     color:#fff;
          //     font-size: 30px;
          //     position: absolute;
          //     transform: translate(-50%,50%);
          //   }
          // }
          &:hover{
            box-shadow: 0 0 8px #ddd,0 0 8px rgba(6, 216, 190,.1);;
          }
          .logo-container{
            height: 80px;
            display: flex;
            align-items:center;
            .logo{
              display: block;
              margin: 0 auto;
              max-width: 80px;
              max-height: 80px;
            }/*logo*/
          }
          
          .company-name{
            text-align: center;
            margin: 8px auto;
            color: $blue;
            max-width: 200px;
            @include over-text;
          }/*company-name*/
          .company-type{
            color:$font3;
            margin: 5px 0;
            font-size: 14px;
            text-align: center;
          }/*company-name*/
          .company-introduce{
            text-align: center;
            margin: 5px 0;
            font-size: 14px;
            padding-bottom: 15px;
            border-bottom: 1px dashed #ddd; 
            color:$font2;
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
      }/*company-middle-card*/

</style>