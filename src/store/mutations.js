import{
ADD_COUNTER, ADD_TO_CART
} from "./mutations-types"

export default {
    // addCart(state, payload) {
    //   // 数组常用的方法有哪些? jpin/push/pop/unshift/shift/sort/reverse/map/filter/reduce/find
    //   //1、payload新添加的商品
    //   // let oldProduct = null;
    //   // for (let item of state.cartList) {
    //   //   if (item.iid === payload.iid) {
    //   //     oldProduct = item;
    //   //   }
    //   // }   //可以用下面数组find的方法
    //   //1、查找之前数组是否有该商品
    //   let oldProduct = state.cartList.find(item => item.iid == payload.iid);
    //   //2、判断oldProduct
    //   if (oldProduct) {
    //     oldProduct.count++;
    //   } else {
    //     payload.count = 1;
    //     state.cartList.push(payload);
    //   }
    // }

    //mutations唯一的目的就是修改state中状态
    //mutations中的每个方法尽可能完成的事件比较单一一点,所以放在active里，传的方式变成，dispatch
    [ADD_COUNTER](state, payload) {
      payload.count++;
    },
    [ADD_TO_CART](state, payload) {
      payload.checked = true;
      state.cartList.push(payload);
    }
}