<template>
  <div class="wrapper" ref="aaaa">
    <div>
      <!--1.无论是否设置click:false, button都可以点击-->
      <button @click="btnClick">按钮</button>

      <!--2.必须设置click:true, 那么div才能监听点击-->
      <div @click="divClick">呵呵呵呵</div>
      <ul class="content">
        <li>分类列表11</li>
        <li>分类列表21</li>
        <li>分类列表31</li>
        <li>分类列表41</li>
        <li>分类列表51</li>
        <li>分类列表61</li>
        <li>分类列表71</li>
        <li>分类列表81</li>
        <li>分类列表91</li>
        <li>分类列表101</li>
        <li>分类列表111</li>
        <li>分类列表121</li>
        <li>分类列表131</li>
        <li>分类列表141</li>
        <li>分类列表151</li>
        <li>分类列表161</li>
        <li>分类列表171</li>
        <li>分类列表181</li>
        <li>分类列表191</li>
        <li>分类列表201</li>
        <li>分类列表211</li>
        <li>分类列表221</li>
        <li>分类列表231</li>
        <li>分类列表241</li>
        <li>分类列表251</li>
        <li>分类列表261</li>
        <li>分类列表271</li>
        <li>分类列表281</li>
        <li>分类列表291</li>
        <li>分类列表301</li>
        <li>分类列表311</li>
        <li>分类列表321</li>
        <li>分类列表331</li>
        <li>分类列表341</li>
        <li>分类列表351</li>
        <li>分类列表361</li>
        <li>分类列表371</li>
        <li>分类列表381</li>
        <li>分类列表391</li>
        <li>分类列表401</li>
        <li>分类列表411</li>
        <li>分类列表421</li>
        <li>分类列表431</li>
        <li>分类列表441</li>
        <li>分类列表451</li>
        <li>分类列表461</li>
        <li>分类列表471</li>
        <li>分类列表481</li>
        <li>分类列表491</li>
        <li>分类列表501</li>
        <li>分类列表371</li>
        <li>分类列表381</li>
        <li>分类列表391</li>
        <li>分类列表401</li>
        <li>分类列表411</li>
        <li>分类列表421</li>
        <li>分类列表431</li>
        <li>分类列表441</li>
        <li>分类列表451</li>
        <li>分类列表461</li>
        <li>分类列表471</li>
        <li>分类列表481</li>
        <li>分类列表491</li>
        <li>分类列表501</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  // 组件挂载完后调用
  mounted() {
    this.scroll = new BScroll(this.$refs.aaaa, {
      // probeType: 3,
      pullUpLoad: true
    });
    this.scroll.on("scroll", position => {
      // console.log(position);  //监听到哪个位置
    });

    //监听已经滚到了底部
    this.scroll.on("pullingUp", () => {
      //pullingUp,要想回调这个函数必须把 pullUpLoad设置为true,默认为false
      console.log("上啦加载更多");
    }); //每次实现了数据加载,要再次调用这个函数,不然只能加载一次
  },
  methods: {
    btnClick() {
      console.log("btnClick");
    },
    divClick() {
      console.log("divClick");
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;

  /* overflow: hidden; */
  /* overflow-y: scroll; */
}
</style>
