<template>
  <div class="filter-group">
    <div class="filter-items">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterGroup',

  data () {
    return {
      
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

<style lang="scss">
  @import "@/style/var.scss";
  .filter-group{
    width: $container-width;
    border:2px solid $border2;
    // margin: 0 auto;
    // background-color: #fff;
    background-color: $bgc2;
    .filter-items{
      padding: 2px 20px;
      margin-bottom: 7px;
    }
    .filter-item{

    }
  }


</style>