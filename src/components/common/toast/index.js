import Toast from './Toast'
const obj = {};

obj.install = function (Vue) {
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  //2、创建组件对象实例
  const toast = new toastContrustor()
  //3、将组件对象手动挂载到某一个元素中
  toast.$mount(document.createElement('div'));
  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  
  //5、挂载到Vue原型上
  Vue.prototype.$toast = toast;
}

export default obj;