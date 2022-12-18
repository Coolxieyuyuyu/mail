<template>
  <div class="goods-item" @click="itemClick">
    <!-- 在vue里面，通过load函数监听图片是否加载完 -->
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      //判断用哪个，逻辑或，前面为空 执行后面
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    imageLoad() {
      //发射事件总线
      // this.$bus.$emit("itemImageLoad");
      // 有home，detail到了这个组件，他们加载的图片数量不同
      //1、用路由进行判断
      // if(this.$router.path.indexof('/home')){
      //   this.$bus.$emit("itemImageLoad");
      // } else if(this.$router.path.indexof('/detail')) {
      //   this.$bus.$emit("detailItemImageLoad");
      // }
      //2、在home离开的时候取消监听
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      //跳转到详情页
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
