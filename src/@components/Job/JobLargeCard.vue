<template>
  <div class="job-large-card">
    <div class="top clear">
      <div class="info">
        <p class="title clear">
          <span class='job-name' :title="job_name" @click="$emit('detail')">{{job_name}}</span>
          <span>[{{province}}·{{city}}]</span>
          <span class="date">{{publish.split(' ')[0]}}发布</span>
        </p>
        <p class="salary">
          <span class="salary-num">{{min_salary+"-"+max_salary + "K"}}</span>
          <span class="list">
            <span v-for="(i,index) in list" :key="index">
              {{i}} <span v-if="index!=list.length-1">/ </span>
            </span>
          </span>
        </p>
      </div><!-- info -->

      <div class="company" @click="$emit('company')">
        <p class="name">
          {{company}}
          <company-tag
            :is_vip="is_vip"
            :is_auth="is_auth"
            size="20px"
          />
        </p>

      </div><!-- company -->
      
      <div class="logo-container a" @click="$emit('company')">
        <img :src="logo" class="logo"><!-- logo -->
      </div>
      
    </div>
    

    <div class="bottom clear">
      <p class="labels">
        <span v-for="(i,index) in labels" :key="index">
          {{i.name}}
        </span>
        <span v-if="labels ==false">
          ''
        </span>
      </p>
      <p class="welfare">
        {{welfare}}
      </p>
    </div><!-- bottom -->

  </div>
    
</template>

<script>
import CompanyTag from '@/@components/Icon/CompanyTag'
export default {
  name: '',
  props:{
    salary:{
      type:String,
      default:''
    },
    labels:{
      type:Array,
      default:[]
    },
    publish:{
      type:String,
      default:''
    },
    province:{
      type:String,
      default:'',
    },
    city:{
      type:String,
      default:'',
    },
    max_salary:{
      type:Number,
      default:0,
    },
    min_salary:{
      type:Number,
      default:0,
    },
    company:{
      type:String,
      default:''
    },
    logo:{
      type:String,
      default:'',
    },
    is_vip:{
      type:[Boolean,Number],
      default:false
    },
    is_auth:{
      type:[Boolean,Number],
      default:false
    },
    list:{
      type:Array,
      default:[]
    },
    welfare:{
      type:String,
      default:''
    },
    job_name:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      
    }
  },
  
  method: {
    
  },

  components: {
    'company-tag':CompanyTag
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>
<style lang="scss">
@import "@/style/var.scss";
.job-large-card{
  font-size: 18px;
  width: 900px;
  border:1px solid $border1;
  &:hover{
    box-shadow: 0 0 10px #ddd,0 0 10px rgba(6, 216, 190,.1);;
    // transform:scale(1.005);
  }
  
  .top{
    padding: 30px 20px 0;
  }
  .info{
    float: left;
    width: 450px;
    margin-bottom: 20px;

    .title{
      color: $blue;
      margin-bottom: 10px;
      span{
        float: left;
      }
      .job-name{
      cursor: pointer;

        display: inline-block;
        @include over-text;
        max-width: 400px;
        margin-right: 10px;
      }
      .date{

        color: $font3;
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .salary{

      color:$warning;
      display: inline-block;
      .salary-num{
        display: inline-block;
        width: 150px;
      }
      .list{
        display: inline-block;
        font-size: 16px;
        color: $font2;
      }
    }
  }
  .company{
    float: left;
    width: 300px;
    .name{
      color: $blue;
      cursor: pointer;
    }
    
  }
  .logo-container{
    height: 50px;
    float: left;
    display: flex;
    align-items:center;
  }
  .logo{
    // position: relative;
    // top: 50%;
    // transform:translateY(-50%);
    // margin:-15px 0 15px;
    display: block;
    max-height: 80px;
    max-width: 80px;
    
  }
  .bottom{
    height: 45px;
    background-color: $bgc3;
    display: flex;
    align-items:center;
    padding-left: 20px;
    font-size: 16px;
    .labels{
      color:$font2;
      width: 450px;
      float: left;
      span{
        padding: 2px 8px;
        border-radius: 5px;
        border:1px solid $border1;
        margin-right: 25px;
        vertical-align:middle;     

      }
    }
    .welfare{
      color:$font2;
    }
  }

}
</style>