<template>
  <div class="trail">
    <card
    class="card"
    :logo="require('@/assets/logo.png')"
    style="border-radius: 10px;"
    :name="'公司名'"
    :city="'佛山'"
    :province="'广东'"
    v-for="i in 7"
    description="简介简介简介简介简介简介简介简介简介简介简介简介"
    >
      
    </card>
  </div>
</template>

<script>
import CompanyMiddleCard from '@/@components/Company/CompanyMiddleCard.vue'
export default {
  name: '',

  data () {
    return {
      
    }
  },
  
  methods: {
    
  },

  components: {
    'card':CompanyMiddleCard
  },
  

  computed: {
    
  },
  watch: {

  },
};
</script>

<style lang="scss">
  .trail{
    width: 1200px;  
    margin: 0 auto;
    .card{
      transition:transform .3s;
      display: inline-block;
      margin-left: 15px;
      &:hover{
        transform:scale(1.02);
      }
      &:nth-child(4n+1){
        margin-left: 0;
        margin-top: 15px;
      }
    }
  }
</style>