<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in data" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    data(){ //数据
      return {
        data:[]
      }
    },
    methods: { // 行为
      
    },
    components: { // 组件
      
    },
    created(){
      this.$ajax.get("getlunbo")
          .then(res=> {
            console.log(res.data.message);
            this.data = res.data.message;
          })
          .catch(err=> {
            console.log('轮播图获取失败', err);
          })
    }
  }
</script>
<style scoped>
  div {
    height:150px;
  }
  .mint-swipe-item img{
    width: 100%;
  }

</style>