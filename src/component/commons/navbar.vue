<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a @click="callback" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">{{text}}</h1>
    </header>
  </div>
</template>
<script>
  export default{
    data(){ //数据
      return {}
    },
    methods: { // 行为
      callback(){
        this.$router.go(-1)
      }
    },
    components: { // 组件
      
    },
    props:["text"]
  }
</script>
<style scoped>
  .mui-bar.mui-bar-nav{
    position: static;
  }
</style>