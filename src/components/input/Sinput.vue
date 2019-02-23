<template>
  <div class="sinput" :class="{'trigger':isBlur == false}" @click="$refs.sinput.focus()" ref="sinputDiv" :style="{'width':width}">
      <!-- @blur="!value?isFocus=false:false;isBlur=true"  -->
    <!-- v-model="value"  -->
    <input 
      
      ref="sinput" 
      :type="false == isSee ? type : 'text'" 
      @focus="isFocus=true;isBlur=false" 
      @blur="!value?isFocus=false:false;isBlur=true"
      :class="{'has-icon':see==true}" 
      @input="$emit('input',$event.target.value)"
      :value="value"
      >
      <!-- @input="$emit('input',$event.target.value)" -->
    <div 
      class="placeholder" 
      :class="{'trigger':isFocus==true}" 
    >
      {{placeholder}}
    </div>

    <!-- 查看密码 -->
    <div 
      class="see-password" 
      v-if="type=='password' && see==true" 
      @click.stop="isSee=!isSee;$emit('action')"
    >
      <i 
        class="iconfont" 
        :class="{'icon-eye-open':isSee==true, 'icon-eye-close':isSee==false}"
      >
      </i>
    </div>

    <!-- 重置按钮 -->
    <!-- <div 
      class="reset" 
      v-if="reset==true && see!==true" 
      @click.stop="value='';$refs.sinput.focus();$emit('action')" 
      v-show="!!value==true"
    >
      <i class="el-icon-error"></i>
    </div> -->

    <!-- 发送验证码 -->
    <div 
      class="reset" 
      v-if="code==true" 
      @click.stop="waiting>0?false:$emit('action')"
    >
      <i class="el-icon-message" style="font-size: 20px;" v-if="waiting<=0" @click="afterSend()"></i>
      <span class="time" v-if="waiting>0">
        {{waiting}}s
      </span>
    </div>

  </div>
</template>

<script>

export default {
  name: '',
  model: {
    prop: 'value',
    event: 'input'
  },
  data () {
    return {
      isFocus:false,
      // inputValue:'',
      isBlur:true,
      isSee:false,
      isClose:false,
      waiting:null,
    }
  },
  props:{
    placeholder:{
      default:"用户名",
      type:String,
    },
    type:{
      default:"text",
      type:String,
    },
    value:{
      default:"",
      type:String,
    },
    code:{
      // default:false,
      type:Boolean,
    },
    waitTime:{
      default:10,
      type:Number,
    },
    see:{
      default:false,
      type:Boolean,
    },
    // reset:{
    //   default:false,
    //   type:Boolean,
    // },
    width:{
      default:'',
      type:String,
    }
  },
  methods: {
    afterSend(){
      this.waiting = this.waitTime
      let timer = setInterval(()=>{
        this.waiting--;
        if (this.waiting<=0) {
          clearInterval(timer);
        }
      },1000)
    }
  },

  components: {

  },
  

  computed: {
    
  },
  watch: {
    value:{
      handler(val,old){

        if (val) {
          // console.log(val)
          this.isFocus = true
          // this.reset = true
        }
      },
      immediate:true,
    }
    
  },
};
</script>

<style lang="scss" scoped="scoped">
@import "@/style/var.scss";
  
  .sinput{  
    border: 1px solid $border0;
    
    border-radius: 10px;
    position: relative;
    cursor: text;
    transition:border .2s;

    // width: $sinput-width;
    &.trigger{
      border-color: $blue;
    }

    input{
      margin:10px 0 5px;
      width: calc(100% - 30px);

      line-height: 30px;
      border-radius: 10px;
      font-size: 19px;
      padding-left: 15px;
      color: $font1;
      border:none;
      outline: none;
      &.has-icon{
        width: calc(100% - 30px - 20px);
      }
    }
    .see-password,.reset{
      position: absolute;
      top: 50%;
      transform:translateY(-50%);
      right: 15px;
      cursor: pointer;
      // background-color: red;
    }
    .placeholder{
      color: $font4;
      @include no-select;
      position: absolute;
      top: 50%;
      transform:translateY(-53%);
      margin-left: 15px;
      padding: 0 5px;
      font-size: 16px;
      transition:all .4s;
      

      &.trigger{
        color: $font3;
        font-size: 14px;
        background-color: #fff;
        top: 0;
        transform:-50%;
      }
    }
  }


</style>