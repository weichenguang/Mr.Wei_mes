<template>
  <div>
    <nav-bar text="商品评论"></nav-bar>
    <comment :page="$route.query.goodsid"></comment>
  </div>
</template>
<script>
  export default{
    data(){ //数据
      return {}
    },
    methods: { // 行为
      
    },
    components: { // 组件
      
    }
  }
</script>
<style>

</style>