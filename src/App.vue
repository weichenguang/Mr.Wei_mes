<template>
  <div>
      <mt-header title="上海9期信息管理系统"></mt-header>
      <router-view></router-view>
      <nav class="mui-bar mui-bar-tab">
        <router-link  :to="{name:'home'}" class="mui-tab-item mui-active" href="#tabbar">
          <span class="mui-icon icon-shouye"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link  :to="{name:'vip'}" class="mui-tab-item" href="#tabbar-with-chat">
          <span class="mui-icon icon-huiyuan"><span class="mui-badge">9</span></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link :to="{name:'shopcart'}"  class="mui-tab-item" href="#tabbar-with-contact">
          <span class="mui-icon icon-work-search"></span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link  :to="{name:'search'}"  class="mui-tab-item" href="#tabbar-with-map">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">查询</span>
        </router-link>
      </nav>
  </div>
</template>
<script>
  export default{
    data(){ //数据
      return {

      }
    },
    methods: { // 行为
      
    },
    components: { // 组件
      
    }
  }
</script>
<style>

</style>