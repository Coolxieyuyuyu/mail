<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{ cartLength }}）</div>
    </nav-bar>


    <!-- 商品的列表 -->
    <cart-list/>
    

    <!-- 底部的汇总 -->
    <cart-bottom-bar/>
    
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childComps/CartList.vue"
import CartBottomBar from "./childComps/CartBottomBar"

//vuex提供的方法  mapGetters从vuex框架导入，是一个辅助函数仅仅是将store中的getter映射到局部计算属性
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  methods: {
    printf() {
      console.log(this);
    }
  },
  computed: {
      //两种语法
      ...mapGetters(["cartLength"])
      // ...mapGetters({
      //   length:'cartLength',
      //   list:'cartList'
      // })
  },
  
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
