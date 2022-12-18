<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { itemListenerMiXin, backTopMixin } from "common/mixin";
// import { debounce } from "common/utils";

export default {
  name: "Detail",

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    // Toast
  },
  //混入
  mixins: [itemListenerMiXin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
      // message: "",
      // show: false
    };
  },
  created() {
    //1、保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);
    // 2、根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //2、获取商品信息，new Goods({}) clas的语法
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //7、请求详情页数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list;
      });

      // //第一次获取，值不对，
      // //值不对的原因：this.$refs.params.$el 压根没渲染
      //  this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   //为什么要$el?
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);

      // //第二次获取：值不对
      // //值不对的原因：图片没有计算在内
      // //拿到数据保证渲染完再赋值
      // this.$nextTick(() => {
      //   //根据最新的数据，对应的dom已经被渲染出来
      //   //但是图片依然是没有加载完的（目前获取的offsetTop是不包含图片的）
      //   //在详情页里刷新图片已经被缓存，所以可以，但是一旦跳转回来，就没有了
      //   //offsetTop值不对的时候，都是因为图片问题
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   //为什么要$el?
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
  },

  mounted() {
    //图片数据还没加载过来
    console.log(123);
  },

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      //根据最新的数据，对应的dom已经被渲染出来
      //但是图片依然是没有加载完的（目前获取的offsetTop是不包含图片的）
      //在详情页里刷新图片已经被缓存，所以可以，但是一旦跳转回来，就没有了
      //offsetTop值不对的时候，都是因为图片问题
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      //为什么要$el?
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
      // console.log(this);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      //1、判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //1、获取y值
      const positionY = -position.y;
      // console.log(positionY)
      //2、positionY和主题中值进行对比
      //[0, 4924, 5811, 6168, 自己添加非常大的值]  //在前面.push(最大值)
      //positionY 在0和4924之间，index = 0
      //          在4924和5811之间，index = 1
      //
      //          超过6168，index = 3
      // for (let i in this.themeTopYs) {
      //   // console.log(i + 1) //说明i是一个string
      //   i = i * 1;
      //   // console.log(i + 1)
      //   if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
      //     console.log(i);
      //   }
      // }
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      // if (
      // positionY > this.themeTopYs[i] &&
      // positionY < this.themeTopYs[i + 1]
      // ) {
      //   console.log(i);
      // }  //最后的越界了

      //普通做法
      // if (
      //   this.currentIndex !== i &&
      //   ((i < length - 1 &&
      //     positionY >= this.themeTopYs[i] &&
      //     positionY < this.themeTopYs[i + 1]) ||
      //     (i === length - 1 && positionY >= this.themeTopYs[i]))
      // ) {
      //   this.currentIndex = i;
      //   console.log(this.currentIndex);
      //   this.$refs.nav.currentIndex = this.currentIndex
      // }
      // }

      //升级做法
      //多加了一个无穷大的，所以要减一，不然最后一个还是会越界
      for (let i = 0; i < length - 1; i++) {
        // this.currentIndex !== i 加上这个就不会调用频繁了
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      //1、获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2、将商品添加到购物车里
      //先把购物车里面的东西放在一个临时的地方，用于共享，vuex
      // this.$store.cartList.push(product);
      // this.$store.commit("addCart", product);
      //在vuex实现promise ，要掌握
      this.$store.dispatch("addCart", product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // }, 1500);
        // console.log(res);

        this.$toast.show(res, 1500)
        // console.log(this.$toast)
        // this.$toast.hh()
      });

      //添加到购物车成功
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 60px);
  overflow: hidden;
}
/* overflow设置完滚动条就没法滚动了 */
</style>
