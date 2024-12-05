/*对账系统*/
import {groupBy} from "../../index";

export function setInitParams(Array, billSourceList) {
    Array.forEach(item => {
        delete item.billConfig;
        delete item.customConfig;
        item.Loading = false;
        item.stepsIndex = 0;
        item.imgUrl = '/images/' + item.billSource + '.png';
        billSourceList.forEach(items => {
            if (items.array.includes(item.billSource)) {
                item.imgUrl = '/images/' + items.icon + '.png'
            }
        })
        item.steps = [{
            title: "账单获取",
            status: "wait",
        }, {
            title: "账单预检",
            status: "wait",
        }, {
            title: "账单解析",
            status: "wait",
        }, {
            title: "对账处理",
            status: "wait",
        }, {
            title: "对账完成",
            status: "wait",
        }]
        item.Array = []
        item.Card = []
        item.List = []
        item.charList = []
    })
    return Array;
}

export function setItemParams(Item) {
    Item.Card.forEach(sitem => {
        if (sitem.length > 0) {
            Item.Array.push(sitem[0]['bill_order']);
            Item.Array = Array.from(new Set(Item.Array));
            if (sitem[sitem.length - 1]['bill_state'] === 0) {
                Item.steps[sitem[0]['bill_order'] - 1].status = "success";
            } else if (sitem[sitem.length - 1]['bill_state'] === 1) {
                Item.steps[sitem[0]['bill_order'] - 1].status = "error";
            } else if (sitem[sitem.length - 1]['bill_state'] === 2) {
                Item.steps[sitem[0]['bill_order'] - 1].status = "finish";
                Item.steps[sitem[0]['bill_order'] - 1].icon = "el-icon-warning";
            } else if (sitem[sitem.length - 1]['bill_state'] === 3) {
                Item.steps[sitem[0]['bill_order'] - 1].status = "wait";
                Item.steps[sitem[0]['bill_order'] - 1].icon = "el-icon-loading";
            } else {
                Item.steps[sitem[0]['bill_order'] - 1].status = "wait";
                Item.steps[sitem[0]['bill_order'] - 1].icon = "";
            }
        }
    })
    return Item;
}

export function setinfoListParams(infoList) {
    infoList.forEach((items) => {
        if (items.bill_state === 0) {
            items.icon = "rtdp icon-shuruzhengque";
            items.color = "#0bbd87";
        } else if (items.bill_state === 1) {
            items.icon = "rtdp icon-icon_wrong";
            items.color = "#F56C6C";
        } else if (items.bill_state === 2) {
            items.icon = "el-icon-bell";
            items.color = "#E6A23C";
        } else {
            items.icon = "el-icon-loading";
            items.color = "#409EFF";
        }
    });
    return infoList;
}

export function setListParams(dataArray, reorganizingData) {
    dataArray.map(item => {
        reorganizingData.forEach(citem => {
            if (item.bill_source === citem.billSource) {
                citem.List.push(item)
                citem.stepsIndex = citem.List[citem.List.length - 1]['bill_order'];
            }
        })
    })
    return reorganizingData;
}

export function reorganizingListParams(listItem) {
    if (listItem.List.length > 0) {
        const newObj = groupBy(listItem.List, 'bill_order')
        const data = listItem.List[listItem.List.length - 1];
        for (let key in newObj) {
            listItem.Card.push(newObj[key])
        }
        listItem = setItemParams(listItem)
        if (data.success_record_num !== null && data.trade_record_num !== null && data.bill_record_num !== null) {
            listItem.charList = [{
                value: data.success_record_num,
                name: '成功'
            }, {
                value: (data.trade_record_today_num + data.trade_record_his_num + data.bill_record_num) - data.success_record_num * 2,
                name: '异常'
            }]
        } else {
            listItem.charList = [{
                value: 0,
                name: '成功'
            }, {
                value: 0,
                name: '异常'
            }]
        }
    } else {
        listItem.charList = [{
            value: 0,
            name: '成功'
        }, {
            value: 0,
            name: '异常'
        }]
    }
    return listItem;
}

export function setbillcheckOption(color) {
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: "5%"
        },
        color: color,
        series: [{
            center: ['50%', '35%'],
            type: 'pie',
            radius: ['35%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 1
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '15',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [{
                value: 0,
                name: '成功'
            }, {
                value: 0,
                name: '异常'
            }]
        }]
    }
}