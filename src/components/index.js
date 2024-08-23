import './index.scss'
import {checkIdNo} from '@/components/js'
import treeTransfer from "./tree-transfer/";

const components = [treeTransfer];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export {checkIdNo}
export default {
  install,
  treeTransfer,
};