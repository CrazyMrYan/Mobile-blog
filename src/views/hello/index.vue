<template>
  <section class="page-hello">
    <div class="page-content">
      <div class="msg-area common-msg-area">
        <p class="msg-title" v-text="msg"></p>
        <!-- <img src="~@/assets/images/logo.png"> -->
        <div class="user-img"></div>
        <h3 class="app-name">
          <i class="iconfont iconRN-recommend"></i>
          严老湿的小窝~
        </h3>
        <p class="user-desc"> 感谢您的访问，本站收录悲伤日记发布原创文章，以及生活记录相册 </p>
        <div class="icons-link">
          <!-- <a href>
            <i class="iconfont iconRN-edit"></i>
          </a>
          <a href="https://www.yuque.com/nowthen/longroad">
            <i class="iconfont iconRN-yuque"></i>
          </a> -->
          <a href="https://github.com/CrazyMrYan">
            <i class="iconfont iconRN-git"></i>
          </a>
          <a href="https://juejin.im/user/3034307824991006/posts">
            <i class="iconfont iconRN-juejin"></i>
          </a>
        </div>
        <h2 class="time-area">
          现在时间是：<br>
          <show-time />
        </h2>
      </div>

      <div class="common-msg-area urls-area">
        <!-- <h3 class="title">项目页面链接：</h3> -->
        <ul class="list-ul">
          <template v-for="item in routerList">
            <li v-if="item.name" :key="item.name" class="list-li">
              <router-link
                :to="item.path"
                class="url-link"
              >{{(item.meta && item.meta.title) || item.name}}</router-link>
            </li>
          </template>
        </ul>
      </div>
      <!-- <p>点击后tip提示</p> -->
      <!-- <main-button btn-text="确定" :btn-disabled="false" @handle-click="handleNext" /> -->
    </div>
    <!-- <base-tip v-model="tip.show" :text="tip.text" :type="tip.type" /> -->
  </section>
</template>

<script type="text/babel">
import ShowTime from '@/component_modules/ShowTime';
import MainButton from '@/component_basics/MainButton';
import BaseTip from '@/component_basics/BaseTip';
// 组件
export default {
  name: 'page-hello',
  components: {
    ShowTime,
    MainButton,
    BaseTip
  },
  data() {
    return {
      tip: {
        show: false,
        text: '欢迎多多点击！',
        type: 'success'
      },
      msg: '欢迎访问',
      start: false,
      routerList: [],
      interval_timer: null
    };
  },
  created() {
    this.routerList = this.$router.options.routes.filter(
      item => item.path !== this.$route.path
    );
  },
  methods: {
    handleNext() {
      const types = [
        { type: 'info', text: '欢迎多多点击！' },
        { type: 'success', text: '恭喜点击成功了！' },
        { type: 'warning', text: '警告，警告...' },
        { type: 'error', text: '错误提示：点击次数超限！' }
      ];
      const random = Math.floor(Math.random() * 4);
      this.tip.show = true;
      this.tip.text = types[random].text;
      this.tip.type = types[random].type;
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" >
@import './style.less';
</style>
