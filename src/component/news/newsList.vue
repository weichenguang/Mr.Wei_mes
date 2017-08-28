<template>
  <div class="box">
      <nav-bar text="新闻列表"></nav-bar>
      <!--怎么 根据URL 查找对应的模版 mui-->
    <ul class="mui-table-view">
      <li v-for="newsList in data" :key="newsList.id"  class="mui-table-view-cell mui-media">
        <!--router-link 必须配合:to使用 -->
        <router-link :to="{name:'news.detail', query:{newsId:newsList.id} }" href="javascript:;">
          <img class="mui-media-object mui-pull-left"  :src="newsList.img_url">
          <div class="mui-media-body">
            <span>{{newsList.title}}</span>
            <div class="news-desc">
              <p>点击数:{{newsList.click}}</p>
              <p>发表时间:{{newsList.add_time | changeTime}}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
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
      this.$ajax.get("getnewslist")
          .then(res=>{
            this.data = res.data.message
          })
          .catch(err=>{
            console.log(err);
          })

    }
  }
</script>
<style>
  .mui-media-body p {
    color: #0bb0f5;
  }

  .news-desc p:nth-child(1) {
    float: left;
  }

  .news-desc p:nth-child(2) {
    float: right;
  }
</style>