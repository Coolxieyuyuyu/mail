<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :itemInfo="item"
      />
    </scroll>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  },

  //（添加图片数据）每次改变dom都要refresh重新计算一次
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  /* height: calc(100% - 44px - 49px - 40px); */
  height: calc(100% - 44px - 49px - 40px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>
