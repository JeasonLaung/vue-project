<template>
  <li 
    @click="$emit('click')" 
    ref="tab_item" 
    :class="{'active':true==isThisRoute}"
  >
    <router-link v-if="true==!!to" :to="to">
      <slot></slot>
    </router-link>
    <slot v-else></slot>
  </li>
</template>

<script>

export default {
  name: 'TabItem',

  data () {
    return {

    }
  },
  mounted(){
    // console.dir(this.to)
  },
  method: {
    
  },
  props:{
    to:{
      type:String,
      default:''
    }
  },
  components: {

  },
  

  computed: {
    isThisRoute(){
      let re = new RegExp(this.to+"$");
      return re.test(this.$route.path);

    //   let r  = this.$route.path.split('/'),
    //       to = this.to;
    //       console.log(r,to)
    //   return r == to;
    }
  },
  watch: {

  },
};
</script>

<style lang="scss" scoped="scoped">
.active{
  *{
    color: #333!important;
  }
}



</style>