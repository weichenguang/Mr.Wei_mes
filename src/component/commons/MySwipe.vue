<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in data" :key="index">
        <a href="#">
          <img :src="item.imgUrl" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script type=text/ecmascript-6>
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
    props:["url"],
    created(){
      this.$ajax.get(this.url)
          .then(res=> {
        this.data = res.data.message;

        this.data.forEach(ele =>{
          ele.imgUrl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503939835893&di=43853c3b1a4b84b2ff553e7ccdecb04c&imgtype=0&src=http%3A%2F%2Fexp.cdn-hotels.com%2Fhotels%2F4000000%2F3900000%2F3893200%2F3893187%2F3893187_25_y.jpg"
        })
            console.log(this.data);
          })
    .catch(err=> {
        console.log('轮播图获取失败', err);
    })
    }
  }
</script>
<style scoped>
  div {
    height: 200px;
  }
  .mint-swipe-item img{
    height: 200px;
    width: 100%;
  }

</style>