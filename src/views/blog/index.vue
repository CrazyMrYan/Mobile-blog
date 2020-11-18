<template>
  <section>
    <Header showLeft  fixed @handle-left="goBack"></Header>
    <div class="page-content header-fixed">
      <div class="blog_item" @click="getBlogDetails(item.id)"  v-for="(item,index) in blogData" :key="index">
        <h2>{{item.title}}</h2>
        <div class="content">
          <div class="img_box">
            <img v-if="item.img" :src="item.img" alt="" srcset="">
            <img v-else src="../../assets/images/logo.png" alt="">
          </div>
          <div class="content_text">
            <p>{{item.describe || '这个人很懒，没有写描述信息...'}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <mavon-editor :boxShadow="false" :editable="false" defaultOpen="preview" :toolbarsFlag="false" :preview="true" :subfield="false" v-model="value"/> -->
  </section>
</template>

<script>
import Header from "@/component_basics/Header";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Header,
  },
  data() {
    //这里存放数据
    return {
      blogData:[]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    // 获取博客列表
    getBlogList() {
      this.$Post("blog/list", {
        keyword: "",
        pageSize: "10",
        pageIndex: "0",
      }).then((res) => {
        this.blogData = res.data
      });
    },
    getBlogDetails(e){
      this.$router.push(
        {
          path:"/showBlog",
          query:{
            id:e
          }
        }
      )
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getBlogList();
  },
};
</script>
<style lang="less" scoped>
.page-content {
  margin-top: 0.5rem;
  p {
    font-size: 0.4rem;
    line-height: 0.8rem;
    color: #666;
  }
}
.blog_item {
  width: 100%;
  height: 4.2rem;
  border-radius: 5px;
  box-shadow: 0 0.02667rem 0.10667rem -0.05333rem #696a6b;
  padding: .2rem;
  box-sizing: border-box;
  & h2{
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  h2{
    text-align: left;
    font-size: 1.2em;
    height: .75rem;
    font-weight: 600;
  }
  .content{
    width: 100%;
    height: 3rem;
    display: flex;
    .img_box{
      width: 3rem;
      height: 3rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .content_text{
      flex: 1;
      text-align: left;
      margin-left: .2rem;
      text-indent: 2em;
    }
  }
}
</style>