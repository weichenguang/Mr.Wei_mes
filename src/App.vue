<template>
  <div>
      <mt-header title="Vue 项目" ref="n1"></mt-header>
    <transition name="main" mode="out-in">
      <router-view>
      </router-view>
    </transition>
      <nav class="mui-bar mui-bar-tab" ref="n2">
        <router-link  :to="{name:'home'}" class="mui-tab-item " href="#tabbar">
          <span class="mui-icon icon-shouye"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link  :to="{name:'vip'}" class="mui-tab-item" href="#tabbar-with-chat">
          <span class="mui-icon icon-huiyuan"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link :to="{name:'shopcart'}"  class="mui-tab-item" href="#tabbar-with-contact">
          <span class="mui-icon icon-work-search"><span class="mui-badge">{{Num}}</span></span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link  :to="{name:'search'}"  class="mui-tab-item" href="#tabbar-with-map">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">查询</span>
        </router-link>
      </nav>
  </div>
</template>
<script type=text/ecmascript-6>
  import Connect from "./component/commons/Connect.js"
  export default{
    data(){ //数据
      return {
        Num:0
      }
    },
    methods: { // 行为
      
    },
    components: { // 组件

    },
    created(){
//      父组件 接受信息
      Connect.$on("ChangeShopCart",(num)=>{
         this.Num += num;
      });
      Connect.$on("changeShopcart2",(num)=>{
        this.Num = num;
      });
    }
  }
</script>
<style>
  .main-enter-active, .main-leave-active {
    transition: opacity .5s
  }
  .main-enter, .main-leave-to  {
    opacity: 0
  }
</style>