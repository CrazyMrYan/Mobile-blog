<template>
  <section>
    <Header showLeft  fixed @handle-left="goBack"></Header>
    <div class="page-content">
        <mavon-editor :boxShadow="false" :editable="false" defaultOpen="preview" :toolbarsFlag="false" :preview="true" :subfield="false" v-model="content"/>
    </div>
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
      content: "",
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
    getBlogDetails(e) {
      this.$Post("blog/details",{id:e}).then((res) => {
        this.content = res.data.content;
      });
    },
  },
  created() {},
  mounted() {
    this.getBlogDetails(this.$route.query.id)
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
</style>