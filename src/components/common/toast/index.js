//插件的封装方式

import Toast from "./Toast";

const obj = {};
//执行install就会默认执行vue
obj.install = function(Vue) {
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  //2、new的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor();

  //3、将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement("div"));

  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el);

  Vue.prototype.$toast = toast;
  // console.log('执行')
};

export default obj;
