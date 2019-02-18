<template>
  <div class="visit-job-page">
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
  
  methods: {
    
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
  .visit-job-page{
    width: 1090px;  
    margin: 0 auto;
    .card{

      display: inline-block;
      margin-left: 20px;
      &:nth-child(3n+1){
        margin-left: 0;
        margin-top: 20px;
      }
    }
  }
</style>