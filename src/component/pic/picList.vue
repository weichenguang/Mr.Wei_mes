<template>
  <div class="box">
      <nav-bar text="图文分享"></nav-bar>
    <div class="photo-header">
      <ul class="title">
        <li v-for="(title,index) in data" :key="index">
          <a   @click="sendAjax(title.id)">{{title.title}}</a>
        </li>
      </ul>
    </div>

    <div class="photo-list">
      <ul>
        <li v-for="img in imgDate" :key="img.id">
          <router-link :to="{name:'pic.detail',params:{imgId:img.id} }">
            <img v-lazy="img.img_url">
            <p>
              <span>{{img.title}}</span>
              <br>
              <span>{{img.zhaiyao}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
  </div>
</template>
<script type=text/ecmascript-6>
  export default{
    data(){ //数据
      return {
        data:[],
        imgDate:[]
      }
    },
    methods: { // 行为
      sendAjax(id){
        this.$ajax.get('getimages/' + id)
          .then(res=>{
            console.log(res.data.message);
            this.imgDate = res.data.message
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
    components: { // 组件
      
    },
    created(){
      this.$ajax.get("getimgcategory")
          .then(res=>{
            this.data = res.data.message;
            this.data.unshift({
              id:0,
              title:"全部"
            })
          })
          .catch(err=>{

          })
//  数据请求回来就 发一次 请求图片数据并渲染
      this.sendAjax(0);
    }
  }
</script>
<style scoped>

  /*图片懒加载 属于mint-ui中的插件 直接引用样式和设置img v-lazy属性就ok*/
  /*图片懒加载*/
  image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
  }



  .photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
  }

  .photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5px;
  }


  /*下面的图片*/

  .photo-list li {
    list-style: none;
    position: relative;
  }

  .photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
  }

  .photo-list ul {
    padding-left: 0px;
    margin: 0;
  }

  .photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
  }

  .photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
  }
  .title{
    margin: 5px 0;
  }
</style>