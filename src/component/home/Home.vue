<template>
  <div>
    <my-swipe url="getlunbo"></my-swipe>
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'news.list'}">
            <span class="mui-icon mui-icon-home"></span>
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'pic.list'}">
            <span class="mui-icon mui-icon-email"></span>
            <div class="mui-media-body">图文分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link :to="{name:'goods.list'}">
            <span class="mui-icon mui-icon-chatbubble"></span>
            <div class="mui-media-body">商品展示</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
          <span class="mui-icon mui-icon-location"></span>
          <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
          <span class="mui-icon mui-icon-search"></span>
          <div class="mui-media-body">搜索资讯</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
          <span class="mui-icon mui-icon-phone"></span>
          <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  export default{
    data(){ //数据
      return {
      }
    },
    methods: { // 行为
      
    },
    components: { // 组件
      
    },

  }
</script>
<style scoped>

  .mui-table-view.mui-grid-view.mui-grid-9{
    background-color:white;
    border: none;
  }
  .mui-table-view.mui-grid-view.mui-grid-9 li{
    border: none;
  }
  .mui-icon-home:before,
  .mui-icon-email:before,
  .mui-icon-chatbubble:before,
  .mui-icon-location:before,
  .mui-icon-search:before,
  .mui-icon-phone:before{
    content:""
  }
  .mui-icon{
    height: 50px;
    width:50px;
  }
  .mui-icon-home{
    background-image: url('../../static/img/news.png');
    background-size: cover;
  }
  .mui-icon-email{
    background-image: url('../../static/img/picShare.png');
    background-size: cover;
  }
  .mui-icon-chatbubble{
    background-image: url('../../static/img/goodShow.png');
    background-size: cover;
  }
  .mui-icon-location{
    background-image: url('../../static/img/feedback.png');
    background-size: cover;
  }
  .mui-icon-search{
    background-image: url('../../static/img/search.png');
    background-size: cover;
  }
  .mui-icon-phone{
    background-image: url('../../static/img/callme.png');
    /*background-size: cover;*/
    background-repeat: round;
  }

</style>