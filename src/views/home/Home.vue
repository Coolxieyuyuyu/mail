<template>
  <div id="home">
    <!-- 要插东西的话用双标签 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- 不加冒号传的是字符串3 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 被包含在better-scroll插件内的非button的点击事件，要将click设置为true，否则不起作用 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <!-- 组件是无法直接监听原生js点击的，如果要的话要加上.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";
//上面两个等同于下面，
// import {Swiper, SwiperItem} from 'components/common/swiper'
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
// import { debounce } from "common/utils";
import { itemListenerMiXin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll
  },
  //混入
  mixins: [itemListenerMiXin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] }, //page用于加载数据，加载到第几页的，list用于记录已经加载的数据
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  created() {
    // console.log(this)
    // 1.请求轮播图，推荐数据
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    // 1.图片加载完成的事件监听
    // 这样写会输出30个11111，意味着里面的东西会调用很多次，可以弄个防抖提高效率，就不用每次监听到一张图片就输出一次了
    // this.$bus.$on("itemImageLoad", () => {
    //   this.$refs.scroll && this.$refs.scroll.refresh();
    //   console.log(11111);
    // });
    //如果有一些函数调用非常频繁，可以用防抖动，做一层包装
    // let newRefresh = debounce(
    //   this.$refs.scroll && this.$refs.scroll.refresh,
    //   50
    // );
    // //对监听的事件进行保存
    // this.itemImgListener= () => {
    //   newRefresh();
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);
    // 2、获取tabControl的offsettop
    //所有的组件都有一个属性$el，用于获取组件中的元素
    // console.log(this.$refs.tabControl2.offsFetTop); //输出undefined，说明组件没有offsetTop这个属性
    // console.log(this.$refs.tabControl2.$el);
    // console.log(this.$refs.tabControl2.$el.offsetTop);  //拿到的offsetTop不包含图片被撑起来的，要等图片加载完再拿.offsetTop才对
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    //1、保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY)

    //2、取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },

  methods: {
    //事件监听相关方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      //1、判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      //2、决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      // console.log(1223)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffsetTop)
    },

    //网络请求相关方法
    //获取轮播图数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    //
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      // console.log(type);
      // console.log(page)
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list); //将里面的数据变成数组一个一个传进去
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
