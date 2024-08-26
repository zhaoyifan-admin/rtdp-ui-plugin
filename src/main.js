import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import ehUiPlugin from "eh-ui-plugin";
// import "eh-ui-plugin/lib/eh-ui-plugin.css"
// Vue.use(ehUiPlugin);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')