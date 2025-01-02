import './index.scss'
import {checkIdNo, isFieldEmpty, deleteField, desensitizeID, deepClone, consoleLog} from './js'
import treeTransfer from "./tree-transfer";
import {get, post, download, put, deleted, patch} from './js/axios'
import {bd09_To_gps84, gcj02_To_Bd09, gcj02_To_Gps84, gps84_To_bd09} from './js/gps'
import {canterAmVaa} from './js/page/center/Am/Vaa'
import {canterAmArova} from './js/page/center/Am/Arova'
import {getPie3D} from './js/piecharts'
import {setInitParams, setItemParams, setinfoListParams, setListParams, reorganizingListParams, setbillcheckOption} from './js/page/rs'
import {analysisData} from './js/de'
import {encryptionData} from './js/dd'

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
    consoleLog,
    checkIdNo,
    isFieldEmpty,
    deleteField,
    desensitizeID,
    get,
    post,
    deepClone,
    download,
    put,
    deleted,
    patch,
    bd09_To_gps84,
    gcj02_To_Bd09,
    gcj02_To_Gps84,
    gps84_To_bd09,
    analysisData,
    encryptionData,
    //CRUD 文件
    canterAmVaa,
    canterAmArova,
    //BIA 文件
    getPie3D,
    // 对账文件
    setInitParams,
    setItemParams,
    setinfoListParams,
    setListParams,
    reorganizingListParams,
    setbillcheckOption
}
export default {
    install,
    treeTransfer
};