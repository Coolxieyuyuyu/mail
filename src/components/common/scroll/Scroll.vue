<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      message: "哈哈哈"
    };
  },
  mounted() {
    // 1.创建BScroll对象
    //在vue里面要拿到某个确定的元素，绑定ref
    //通过document.querrySelecter.wrapper去拿元素的话，假如有很多地方有.wrapper，不知道拿到哪一个
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // console.log(this.scroll)  里面的scroll.scrollerHeight就是他计算的滚动高度
    // this.scroll.refresh()  //等图片加载完，再调用这个方法就可以重新计算

    // 3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log(11);
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      // 先判断this.scroll有没有值
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //完成上拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log(12)  //防抖完，只打印一次了
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped></style>
