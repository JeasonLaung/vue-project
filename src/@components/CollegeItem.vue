<template>
  <!-- <div class="schools"> -->
    <!-- <ul> -->
      <!-- <li v-for="(i,index) in 16" :key="index"> -->
        <figure>
          <p class="logo-container">
            <img :src="logo" :alt="name" class="logo a"  @click="$emit('detail')"/>
          </p>
          <figcaption>
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
              <p>
                {{name}}
              </p>
              <p slot="reference"  class="school-name a" @click="$emit('detail')">
                {{name}}
              </p>
            </el-popover>
            <p class="school-location"><i class="el-icon-location-outline"></i>{{province}}{{city?'，'+city:''}}</p>
            <p class="school-introduce">{{description}}</p>
          </figcaption>
          
          <div class="bottom">
            <div>
              <span class="num">{{student_num||0}}</span>
              <span class="text">学生人数</span>
            </div>
            <div>
              <span class="num">{{major_num||0}}</span>
              <span class="text">对口专业</span>
            </div>
          </div>
        </figure>
      <!-- </li> -->
    <!-- </ul> -->
  <!-- </div> -->
</template>

<script>

export default {
  name: 'College',

  data () {
    return {
      
    }
  },
  props:{
    name:{
      type:String,
      default:'',
    },
    logo:{
      type:String,
      default:'',
    },
    province:{
      type:String,
      default:'',
    },
    city:{
      type:String,
      default:'',
    },
    description:{
      type:String,
      default:'',
    },
    student_num:{
      type:[String,Number],
      default:0,
    },
    major_num:{
      type:[String,Number],
      default:0,
    },
  },
  methods: {
    
  },

  components: {

  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  @import "@/style/var.scss";
      // .schools{
      //   padding: 20px 0;
      //   width: 100%;
      //   background-color: #fff;
      //   ul{
      //     width: $container-width;
      //     margin: 0 auto;
      //     display: flex;
      //     flex-wrap:wrap;
      //     justify-content:space-between;
      //     li{
      //       overflow: hidden;
      //       height: 270px;
      //       width: $company-width;
      //       border: 1px solid #ddd;
      //       &:hover{
      //         box-shadow: 0 0 8px #ddd,0 0 8px rgba(6, 216, 190,.1);
      //       }
      //       &:nth-of-type(4n+3){
      //         margin-bottom: $space-width;
      //       }
            // &:nth-of-type(4n+3){
            //   margin: 0 $space-width $space-width;
            // }
            figure{
              width: 250px;
              border:1px solid $border1;
              background-color: #fff;
              padding: 20px 18px 10px;
              .logo-container{
                height: 80px;
              }
              .logo{
                display: block;
                margin: 0 auto;
                max-width: 80px;
                max-height: 80px;
              }/*logo*/
              .school-name{
                text-align: center;
                margin: 8px auto;
                max-width:220px;
                @include over-text;

              }/*company-name*/
              .school-location{
                color:#999;
                margin: 5px 0;
                font-size: 14px;
                text-align: center;
              }/*company-name*/
              .school-introduce{
                margin: 5px 0;
                font-size: 14px;
                padding-bottom: 15px;
                border-bottom: 1px dashed #ddd; 
                color:#666;
                display: block;
                // white-space: nowrap;
                // overflow: hidden;
                // text-overflow: ellipsis;
              }/*company-introduce*/
              .bottom{
                display: flex;
                // justify-content:space-between;
                align-items:center;
                height: 60px;
                div{
                  margin: 0 auto;
                  display: flex;
                  flex-direction:column;
                  text-align: center;
                  width: 50%;
                  border-right: 1px solid #e2e2e2;
                  &:last-child{
                    border-right:none;
                  }
                  /*不同*/
                  padding: 0 30px;
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
            
          // }/*li*/
        // }/*ul*/
      // }/*school*/


</style>