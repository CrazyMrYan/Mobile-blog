<template>
  <section class="page-demo">
    <Header showLeft showRight fixed @handle-left="goBack"></Header>
    <div v-if="!atsLock" class="page-content header-fixed">
      <p>Hi，我是严家辉</p>
      <p>
        别人也喜欢叫我 <span class="code">严老湿</span>、<span class="code"
          >老严</span
        >
      </p>
      <p>计算机专业出生，从事IT行业</p>
      <p>目前职业是：<span class="code">Web前端</span></p>
      <p>
        自己的主要技术栈是 <span class="code">Node</span>、<span class="code"
          >Vue</span
        >、<span class="code">JavaScript</span>、<span class="code">MySql</span>
        ...
      </p>
      <p>
        平常经常喜欢在各平台发一些技术文章博客之类，提升自己同时也带动读者们一起学习。
      </p>
      <p class="essay">
        你总会有一样你中意的事物，只是你还没遇到它，如果你不知道你喜欢什么，不要迷茫，继续追寻，总会找到这个你最喜欢做的事并去坚持它。
        亦或者你真的什么都喜欢，什么都想尝试，那就大胆的去做，不要在还没行动就担心后果。你不去执行，又怎么知道未来会怎样发展，一切都只是你的空想而已。
      </p>
      <p>
        当你想要放弃的时候，想想当初为什么要开始。<span class="incline">
          When you want to give up, remember why you started.</span
        >
      </p>
      <!-- <p>     工作台： Github：https://github.com/CrazyMrYan
        博客园：https://home.cnblogs.com/u/10ve Gitee：
        https://gitee.com/CrazyYan/dashboard 作品：
        Meetion：http://crazy.lovemysoul.vip 表白日记：applet of WeChat
        悲伤日记：WeChat Official Account 联系方式： QQ：2407488005
        Email：crazymryan@gmail.com WeChat：yanjiahui12345</p> -->
      <p @click="getAts()">查看 <span class="code">ATS</span> 树</p>
    </div>
    <div v-else class="page-content header-fixed">
    <div id="codeView" v-highlight>
        <pre><code v-html="code"></code></pre>
    </div>
    </div>
  </section>
</template>

<script>
import { formatDate } from "@/utils/cloud-utils";
import MainButton from "@/component_basics/MainButton";
import Header from "@/component_basics/Header";
import transferDom from "@/directives/transferDom";

export default {
  components: {
    // 组件
    MainButton,
    Header,
  },
  directives: {
    // 指令
    transferDom,
  },
  filters: {
    // 过滤器
    formatDate,
  },
  data() {
    return {
      title: "测试",
      atsLock: false,
      code:
`{
    name: '严家辉',
    age:'24',
    gender:'♂',
    nickname:'老严，严老湿',
    skill:['node','mysql','javascript','vue'],
    city:'广东-广州'
    profession:'web前端',
    saying:{
      zh:'当你想要放弃的时候，想想当初为什么要开始。',
      en:'When you want to give up, remember why you started.'
    },
    hobby:'平常经常喜欢在各平台发一些技术文章博客之类，提升自己同时也带动读者们一起学习。',
    postPlatform:{
      '掘金':'悲伤日记',
      '公众号':'悲伤日记',
      'CSDN':'悲伤日记',
      '知乎':'悲伤日记',
      'GitHub':'CrazyMrYan',
      '博客园':'疯狂的严先生'
    },
    production:'Meetion-Ui',
    college:'长沙理工大学',
    WechatID:'yanjiahui12345',
    followMe:'您可以在 postPlatform 中选择一个平台订阅，当然也可以订阅所有！(●'◡'●)'
}`
    };
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    getAts() {
      this.atsLock = !this.atsLock;
      // console.log(JSON.stringify(this.code))
    },
  },
};
</script>

<style lang="less" rel="stylesheet/less" >
.page-demo {
  text-align: left;
  .page-content {
    margin-top: 0.5rem;
    p {
      font-size: 0.4rem;
      line-height: 0.8rem;
      color: #666;
    }
  }
}
h2 {
  font-size: 0.53333rem;
}
</style>
