/*对账系统*/
export function setInitParams(Array) {
    Array.forEach(item => {
        delete item.billConfig;
        delete item.customConfig;
        item.Loading = false;
        item.stepsIndex = 0;
        item.imgUrl = '/images/' + item.billSource + '.png';
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

