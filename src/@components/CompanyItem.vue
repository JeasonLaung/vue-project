<template>
  <div class="companys">
    <ul>
      <li v-for="(i,index) in 16" :key="index">
        <figure>
          <img src="@/assets/logo.png" alt="某某公司" class="logo" />
          <p class="company-name">齐家网</p>
          <p class="company-type">O2O,生活服务/上市公司</p>
          <p class="company-introduce">齐家网（股票代码：1739HK）是中国领先K）是中国领先K）是中国领先</p>
          <div class="bottom">
            <div>
              <span class="num">5</span>
              <span class="text">面试评价</span>
            </div>
            <div>
              <span class="num">5</span>
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
</template>

<script>

export default {
  name: 'Job',

  data () {
    return {
      keywords:''
    }
  },
  
  method: {
    
  },

  components: {

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
      .companys{
        padding: 20px 0;
        width: 100%;
        background-color: #fff;
        ul{
          width: $container-width;
          margin: 0 auto;
          display: flex;
          flex-wrap:wrap;
          justify-content:space-between;
          li{
            overflow: hidden;
            height: 270px;
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
              }/*company-name*/
              .company-type{
                color:#999;
                margin: 5px 0;
                font-size: 14px;
                text-align: center;
              }/*company-name*/
              .company-introduce{
                margin: 5px 0;
                font-size: 14px;
                padding-bottom: 15px;
                border-bottom: 1px dashed #ddd; 
                color:#666;
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

</style>