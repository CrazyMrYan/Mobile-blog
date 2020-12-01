<template>
  <section>
    <Header showLeft  fixed @handle-left="goBack"></Header>
    <div class="page-content header-fixed">
      <div v-for="(item,index) in weatherList" :key="index" class="weather-item">
          <h2 class="date">{{item.date}}</h2>

          <div class="weather">
                <img class="iconImg" v-if="item.weather == '晴'" src="../../../assets/icon/1183144.png" alt="" srcset="">
                <img class="iconImg" v-else-if="item.weather == '多云'" src="../../../assets/icon/1198833.png" alt="" srcset="">
                <img class="iconImg" v-else-if="item.weather == '阴'" src="../../../assets/icon/1198826.png" alt="" srcset="">
                <p>{{item.weather}}</p>
                <h2>{{item.temperature}}</h2>
          </div>
          <div class="weatherInfo">
              <p class="wind">风向：{{item.direct}}</p>
              <p class="humidity">湿度：无</p>
              <p class="airQuality">空气质量：无</p>
          </div>
          
      </div>
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
      blogData:[],
      weatherList:[]
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
    getWeather() {
      this.$Post("cityWeather", { city: "" }).then((res) => {
        this.weatherList = res.data.future;
      });
    },
    // 获取博客列表
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if(!sessionStorage.getItem('weather')){
      this.getWeather();
    }else{
      this.weatherList = JSON.parse(sessionStorage.getItem('weather')).future;
      this.$route.meta.title = JSON.parse(sessionStorage.getItem('weather')).city + this.$route.meta.title
      console.log(this.$route.meta.title)
      document.title = this.$route.meta.title 
    }
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
.weather-item{
    width: 100%;
    height: 180px;
    text-align: left;
    padding: 1em;
    border-bottom: 1px solid #ccc;
    .date{
        height: 40px;
    }
    .weatherInfo{
        width: 100%;
        display: flex;
        p{
             flex: 1;
             text-align: center;
             font-size: .36rem;
        }
        .wind{
            text-align: left;
        }
        .humidity{
            text-align: center;
        }
        .airQuality{
            text-align: right;
        }
    }
    h2{
       font-size: 1.4em;
    }
    .weather{
        width: 100%;
        height: 60px;
        display: flex;
        line-height: 60px;
        img,p{
            line-height: 60px;
        }
        p{
            padding-left: 20px;
            flex: 1;
        }
        
    }
    .iconImg{
        height: 50px;
    }
}
</style>