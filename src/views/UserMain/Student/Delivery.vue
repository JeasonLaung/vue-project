<template>
  <div class="delivery-page">
    <card
      class="card"
      v-for="i in 6"

    />
  </div>
</template>

<script>

import JobSmallCard from '@/@components/Job/JobSmallCard.vue'
export default {
  name: '',

  data () {
    return {
      
    }
  },
  
  method: {
    
  },

  components: {
    'card':JobSmallCard
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  @import "@/style/var.scss";
  .delivery-page{
    width: 1090px;  
    margin: 0 auto;
    .card{

      display: inline-block;
      margin-left: 20px;
      background-color: #f8f8f8;
      &:nth-child(3n+1){
        margin-left: 0;
        margin-top: 20px;
      }
    }
  }
</style>