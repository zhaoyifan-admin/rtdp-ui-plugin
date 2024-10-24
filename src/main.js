import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

// import rtdp from "rtdp-ui-plugin";
// import "rtdp-ui-plugin/lib/rtdp-ui-plugin.css"
// Vue.use(rtdp);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')