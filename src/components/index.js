import './index.scss'
import {checkIdNo} from '@/components/js'
import treeTransfer from "./tree-transfer/";
import {get, post, download, put, deleted, patch} from '@/components/js/axios'
import {getLodop} from '@/components/js/lodop'
import {bd09_To_gps84, gcj02_To_Bd09, gcj02_To_Gps84, gps84_To_bd09} from "@/components/js/gps";

const components = [treeTransfer];
const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}
export {
    checkIdNo,
    get,
    post,
    download,
    put,
    deleted,
    patch,
    getLodop,
    bd09_To_gps84,
    gcj02_To_Bd09,
    gcj02_To_Gps84,
    gps84_To_bd09
}
export default {
    install,
    treeTransfer,
};