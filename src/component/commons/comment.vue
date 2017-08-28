<template>
  <div  class="box">
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span><a @click="callback">返回</a></span>
          </div>
        </li>
        <li class="txt-comment">
          <textarea v-model="content"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="large" @click="send">发表评论</mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>{{data.length}}条评论</span>
          </div>
        </li>
      </ul>

      <ul class="comment-list">
        <li v-for="(item,index) in data" :key="index">
          {{item.user_name}}:{{item.content}} {{item.add_time | changeTime}}
        </li>
      </ul>
      <mt-button size="large" type="danger" plain  @click="loadMoreByPage">加载更多</mt-button>
    </div>
  </div>
</template>
<script type=text/ecmascript-6>
  export default{
    data(){ //数据
      return {
          data:[],
          content:"",
          num:2
      }
    },
    props:["page"],
    methods: { // 行为
      callback(){
        this.$router.go(-1)
      },
      getFristPage(){
        this.$ajax.get("getcomments/"+ this.page + "?pageindex=1")
            .then(res=>{
              this.data = res.data.message
            })
            .catch(err=>{
              console.log(err);
            })
      },
      send(){
        this.$ajax.post("postcomment/" + this.page,"content=" + this.content)
            //这样处理绕过json的头和数据，而是做键值对
          .then(res=>{
            if(res.data.status === 0){
              this.content = "";
              this.getFristPage();
            }
          })
          .then(err=>{
            console.log(err);
          })
      },
      loadMoreByPage(){
        this.$ajax.get("getcomments/"+ this.page + "?pageindex=" + this.num )
        .then(res=>{
          this.num ++
          this.data = this.data.concat(res.data.message)
        })
        .catch(err=>{
          console.log(err);
        })
      }
    },
    components: { // 组件
      
    },
    created(){
      this.getFristPage();
    }
  }
</script>
<style scoped>
  .photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
  }

  .photo-comment > div span:nth-child(2) {
    float: right;
  }

  .photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
  }

  .txt-comment {
    padding: 5px 5px;
  }

  .txt-comment textarea {
    margin-bottom: 5px;
  }

  .comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

</style>