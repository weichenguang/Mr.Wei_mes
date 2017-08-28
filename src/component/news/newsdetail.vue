<template>
  <div>
    <nav-bar :text="title"></nav-bar>
    <div class="news-title">
      <p v-text="data.title"></p>
      <div>
        <span>{{data.click}}次点击</span>
        <span>分类:民生经济</span>
        <span>添加时间:{{data.add_time| changeTime}}</span>
      </div>
    </div>
    <div class="news-content" v-html="data.content"></div>

  </div>
</template>
<script type=text/ecmascript-6>
  export default{
    data(){ //数据
      return {
        data:{},
        title:""

      }
    },
    methods: { // 行为
      
    },
    components: { // 组件
      
    },
    created(){
      let id = this.$route.query.newsId;
      this.$ajax.get('getnew/'+ id )
          .then(res=>{
            this.data = res.data.message[0]
          })
          .catch(err=>{
            console.log(err);
          })
    },
    beforeRouteEnter (to, from, next) {
      console.log(from.name);  // 来至那个组件 输出 name
      console.log(to.name);  // 前往那个组件 输出name
      let title = '';
//      if(from.name === 'news.list'){
//        title = '新闻详情';
//      }else if(from.name === 'goods.detail'){
//        title = '商品详情';
//      }else
      if(to.name.startsWith('goods')){
        title = '商品详情';
      }else if(to.name.startsWith('news')){
        title = '新闻详情';
      }

      next(vm=>{  //最终都是放行
        vm.title = title;
      });
    }
  }
</script>
<style scoped>
  .news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
  }

  .news-title span {
    margin-right: 30px;
  }

  .news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }


  /*主体文章的左右距离*/

  .news-content {
    padding: 10px 5px;
  }
</style>