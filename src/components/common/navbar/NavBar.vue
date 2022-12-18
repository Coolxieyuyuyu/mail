<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="center">
       <slot name="center"></slot>
    </div>

    <div class="right">
       <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-bar{
  display: flex;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100,100,100,0.1);
  /* 不建议在这里直接设置背景颜色，因为一旦设置就写死了，全部页面就都这个颜色了，有些页面不用这个颜色 */
}

.left, .right{
  width: 60px;
  /* background-color: royalblue; */
}

.center{
  flex: 1;
   /* background-color: red; */
}


</style>