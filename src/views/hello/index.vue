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
        <p class="user-desc">
          感谢您的访问，本站收录悲伤日记发布原创文章，以及生活记录相册
        </p>
        <div class="icons-link">
          <!-- <a href>
            <i class="iconfont iconRN-edit"></i>
          </a>
          <a href="https://www.yuque.com/CraazyYan/longroad">
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
          现在时间是：<br />
          <show-time />
        </h2>
      </div>

      <div class="common-msg-area urls-area">
        <!-- <h3 class="title">项目页面链接：</h3> -->
        <ul class="list-ul">
          <template v-for="item in routerList">
            <li v-if="item.name" :key="item.name" class="list-li">
              <router-link :to="item.path" class="url-link">{{
                (item.meta && item.meta.title) || item.name
              }}</router-link>
            </li>
          </template>
        </ul>
      </div>
      <div class="common-msg-area urls-area">
        <div class="m2">
          <p class="cityName">{{ weather.city }}</p>
          <div class="weatherBox">
              <img class="weatherIcon" src="../../assets/icon/1198822.png" alt="">
          </div>
          <p>现在实时温度为：{{ weather.realtime.temperature }} °C</p>
          <p>穿衣推荐：{{weather.realtime.clothing}}</p>
          <p>
            空气质量：<span
              :style="{
                color: weather.realtime.aqi <= 50 ? '#79b800' : '#ffbb17',
              }"
              >{{ weather.realtime.aqi }}</span
            >
          </p>
          
          <p>远在 {{ weather.city }} 的你，过得还好吗？</p>
        </div>
      </div>
      <div class="common-msg-area urls-area">
        <div class="m2">
          <p class="cityName">历史上的今天 {{ HistoryToday[0].month  +' - '+ HistoryToday[0].day}}</p>
          <div class="HistoryToday">
            <img :src="HistoryToday[0].pic" alt="" srcset="">
            <div class="details-info">
              <h2>{{HistoryToday[0].title}}</h2>
              <p>{{HistoryToday[0].des}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <main-button btn-text="确定" :btn-disabled="false" @handle-click="handleNext" /> -->
    </div>
    <base-tip v-model="tip.show" :text="tip.text" :type="tip.type"  :Param="tip"/>
  </section>
</template>

<script type="text/babel">
import ShowTime from "@/component_modules/ShowTime";
import MainButton from "@/component_basics/MainButton";
import BaseTip from "@/component_basics/BaseTip";
// 组件
export default {
  name: "page-hello",
  components: {
    ShowTime,
    MainButton,
    BaseTip,
  },
  data() {
    return {
      tip: {
        show: false,
        text: "欢迎多多点击！",
        type: "success",
      },
      msg: "欢迎访问",
      start: false,
      routerList: [],
      interval_timer: null,
      weather: {},
      HistoryToday:[]
    };
  },
  created() {
    this.routerList = this.$router.options.routes.filter(
      (item) => item.path !== this.$route.path
    );
    if(!sessionStorage.getItem('weather') || !(sessionStorage.getItem('hours') == new Date().getHours())){
      this.getWeather();
      this.getHistoryToday()
    }else{
      this.weather = JSON.parse(sessionStorage.getItem('weather'))
      this.HistoryToday = JSON.parse(sessionStorage.getItem('HistoryToday'))
    }
    this.handleNext()
    setTimeout(()=>{
      this.tip.show = false;
    },2000)
  },
  
  methods: {
    handleNext() {
      // const types = [
      //   { type: "info", text: "欢迎多多点击！" },
      //   { type: "success", text: "恭喜点击成功了！" },
      //   { type: "warning", text: "警告，警告..." },
      //   { type: "error", text: "错误提示：点击次数超限！" },
      // ];
      // const random = Math.floor(Math.random() * 4);
      this.tip.show = true;
      this.tip.type = 'success';
      this.tip.text = '欢迎来到 老严的小窝!';
    },
    getWeather() {
      this.$Post("cityWeather", { city: "" }).then((res) => {
        this.weather = res.data;
        sessionStorage.setItem('weather',JSON.stringify(this.weather));
      });
    },
    getHistoryToday(){
      this.$Post("HistoryToday").then((res) => {
        // console.log(res)
        this.HistoryToday = res.data;
        sessionStorage.setItem('HistoryToday',JSON.stringify(this.HistoryToday));
        sessionStorage.setItem('hours',new Date().getHours());
      });
    }
  },
};
</script>

<style lang="less" rel="stylesheet/less" >
@import "./style.less";

.m2 {
  padding: 1em;
  p{
    line-height: 1.6em;
    font-size: 1.1em;
  }
  .cityName {
    text-align: center;
    font-size: 1.2em;
    font-weight: 600;
    line-height: 1.8em;
  }
  .weatherBox{
    width: 100%;
    .weatherIcon{
      width: 50px;
    }
  }
}
.HistoryToday{
  width: 100%;
  display: flex;
  height: 120px;
  img{
    display: block;
    width: 30%;
    margin: 10px;
  }
  .details-info{
    flex:1;
    margin-top: 10px;
    width: 70%;
    padding-right: 10px;
    box-sizing: border-box;
    h2{
      width: 100%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-weight: 600;
      margin-bottom: 10px;
    }
    p{
      line-height: 1.2em;
      font-size: 1em;
      text-indent: 2em;
    }
  }
}
</style>
