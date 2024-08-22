import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import ehUiPlugin from "eh-ui-plugin";
import "eh-ui-plugin/lib/eh-ui-plugin.css"
Vue.use(ehUiPlugin);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')