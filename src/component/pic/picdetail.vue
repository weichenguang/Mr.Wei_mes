<template>
  <div>
    <nav-bar text="图片详情"></nav-bar>
    <div class="photo-title">
      <p>{{Info.title}}</p>
      <span>发起日期：{{Info.add_time | changeTime}}</span>
      <span>{{Info.click}}次浏览</span>
      <span>分类：民生经济</span>
    </div>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li v-for="(img,index) in imgs" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
         <!--<img :src="img.src">-->
        <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)">
      </li>
    </ul>
    <div class="photo-desc">
      <p v-html="Info.content"></p>
    </div>


    <!--评论组件-->
     <comment :page="imgID"></comment>

  </div>
</template>
<script type=text/ecmascript-6>
  export default{
    data(){ //数据
      return {
        Info:[],
        imgs:[],
        imgID:""
      }
    },
    methods: { // 行为
      
    },
    components: { // 组件
      
    },
    created(){
       this.imgID = this.$route.params.imgId - 0;
      this.$ajax.all([
            this.$ajax.get("getimageInfo/" + this.imgID),
            this.$ajax.get("getthumimages/" + this.imgID)
          ])
          .then(this.$ajax.spread((Info, img)=> {
            this.Info = Info.data.message[0];
            this.imgs = img.data.message;

//            v-preview 设置位置必须要写
            this.imgs.forEach(ele=> {
              ele.w = 600;
              ele.h = 400;
            })

          }))
          .catch(err=> {
            console.log(err);
          })

    }
  }
</script>
<style scoped>
  li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .photo-title {
    overflow: hidden;
  }

  .photo-title,
  .photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  .photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
  }

  .photo-title span {
    margin-right: 20px;
  }

  .mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
  }

  .mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
  }

  .photo-desc p {
    font-size: 18px;
  }

  .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2px 2px;
  }
</style>