// 校验身份证规则
export function checkIdNo(params) {
    const aCity = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        83: "台湾省",
        91: "国外"
    };
    let iSum = 0;
    if (!/^\d{17}(\d|x)$/i.test(params)) return false;
    params = params.replace(/x$/i, "a");
    if (aCity[parseInt(params.substr(0, 2))] == null) return false;
    const sBirthday = params.substr(6, 4) + "-" + Number(params.substr(10, 2)) + "-" + Number(params.substr(12, 2));
    const d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday !== (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;
    for (let i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(params.charAt(17 - i), 11);
    return iSum % 11 === 1;
}

/**
 * 将树形数据向下递归为一维数组
 * @param {*} arr 数据源
 * @param {*} childs  子集key
 */

export function flattenDeep(arr = [], childs = "Children") {
    return arr.reduce((flat, item) => {
        return flat.concat(
            item,
            item[childs] ? flattenDeep(item[childs], childs) : []
        );
    }, []);
}

/**
 * 将数组转化成树结构 array to tree
 * @param {*} array 数据源
 * @param {*} options 字段名配置项
 */
export function arrayToTree(array = [], options = {id: "id", pid: "pid", children: "children", rootPidVal: null}) {
    let array_ = []; // 创建储存剔除叶子节点后的骨架节点数组
    let unique = {}; // 创建盒子辅助本轮children合并去重
    let root_pid = options.rootPidVal || [
        0,
        "0",
        undefined,
        "undefined",
        null,
        "null",
        "00000000-0000-0000-0000-000000000000",
        ""
    ]; // 可能存在的根节点pid形式
    array.forEach(item => {
        // 筛选可以插入当前节点的所有子节点
        let children_array = array.filter(
            it => it[options.pid] === item[options.id]
        );
        if (Array.isArray(item[options.children]) && item[options.children].length) {
            // 去重合并数组
            item[options.children].map(i => (unique[i[options.id]] = 1));
            item[options.children].push(
                ...children_array.filter(i => unique[i[options.id]] !== 1)
            );
        } else {
            item[options.children] = children_array;
        }
        // 当children_array有数据时插入下一轮array_，当无数据时将最后留下来的根节点树形插入数组
        let has_children = children_array.length > 0;
        if (
            has_children ||
            (!has_children && root_pid.includes(item[options.pid]))
        ) {
            array_.push(item);
        }
    });
    // 当数组内仅有根节点时退出，否组继续处理 最终递归深度次
    if (!array_.every(item => root_pid.includes(item[options.pid]))) {
        return arrayToTree(array_, options);
    } else {
        return array_;
    }
}

// 判断是否为空数据
export function isFieldEmpty(obj, field) {
    return obj[field] === null || obj[field] === undefined || obj[field] === '' || Array.isArray(obj[field]) && obj[field].length === 0;
}

// 将冗余空字段或数据进行删除
export function deleteField(obj) {
    return Object.keys(obj).reduce((result, key) => {
        if (!isFieldEmpty(obj, key)) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

// 证件脱敏
export function desensitizeID(id) {
    const regex18 = /^(\d{3})(\d{3})(\d{4})(\d{2})(\d{2})(\d{3})([0-9Xx])$/;
    return id.replace(regex18, '$1***$3$4$5***$7');
}

export const getObjType = obj => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    const type = getObjType(data);
    let obj;
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        let i = 0;
        const len = data.length;
        for (; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}

export function groupBy(array, key) {
    return array.reduce((result, currentItem) => {
        // 使用 key 作为 result 对象的键来获取或初始化分类数组
        (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
        return result;
    }, {});
}

export function consoleLog(type, message) {
    const title = 'Tvue后台打印信息'
    const tipMessage = '提示'
    const messages = message ? message : '无提示信息'
    if (type === 'success') {
        console.log(`%c %c ` + title + ` %c ` + tipMessage + ` %c \n %c ` + messages + ` `,
            'font-size: 16px;padding:4px;background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzM1NjM4MzgzMTcyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjczMjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik02NzYuNDEgNzYyLjZjMTcuNDYgMTcuNDcgMjguMyA0MS41NSAyOC4zIDY4LjA0IDAgMjYuNTEtMTAuODQgNTAuNTktMjguMyA2OC4wNi0xNy40NyAxNy40Ni00MS41NSAyOC4zLTY4LjA2IDI4LjMtMC42NyAwLTEuMzQgMC0yLjAxLTAuMDEtODQuODktMS4wOC0xNTMuNC03MC4yMy0xNTMuNC0xNTUuNFY1NzguODhjMCAzNi4zOSAxMi41MSA2OS44NyAzMy40NyA5Ni4zNSAyOC40NiAzNS45NyA3Mi41MSA1OS4wNiAxMjEuOTQgNTkuMDYgMjYuNTEgMCA1MC41OSAxMC44NCA2OC4wNiAyOC4zMXoiIGZpbGw9IiMzOTczZjYiIHAtaWQ9IjczMjkiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTQuMjZmNDNhODFBanBCRnkiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjxwYXRoIGQ9Ik00NTIuOTQgNzcxLjU5YzAgODUuMTYgNjguNSAxNTQuMzIgMTUzLjQgMTU1LjQtNTUuMTEtMC4zMS0xMDcuMTgtMTMuNDMtMTUzLjQtMzYuNTItMTE0LjI2LTU3LjEtMTkyLjcxLTE3NS4xOC0xOTIuNzEtMzExLjU5VjE5My4zNmMwLTUzIDQzLjM3LTk2LjM1IDk2LjM1LTk2LjM1IDUzIDAgOTYuMzUgNDMuMzUgOTYuMzUgOTYuMzV2MzcuNEg2NjcuNGMyMi40MiAwIDQzLjEgNy43NiA1OS41MyAyMC43MyAyMi4zOSAxNy42OCAzNi44MyA0NS4wNiAzNi44MyA3NS42MyAwIDI2LjUxLTEwLjg0IDUwLjU5LTI4LjMgNjguMDYtMTcuNDcgMTcuNDYtNDEuNTUgMjguMy02OC4wNiAyOC4zSDQ1Mi45NHYzNDguMTF6IiBmaWxsPSIjMTY1ZGZmIiBwLWlkPSI3MzMwIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk1LjI2ZjQzYTgxQWpwQkZ5IiBjbGFzcz0iIj48L3BhdGg+PC9zdmc+) 100% / contain no-repeat',
            'font-size: 12px;font-style:italic;background: #35495e; padding: 6px; border-radius: 3px 0 0 3px; color: #fff',
            'font-size: 12px;font-style:italic;background: #41b883; padding: 6px 6px; border-radius: 0 3px 3px 0; color: #fff',
            '',
            'font-size: 10px;font-style:italic;background: #2469FF; margin-left: 11px;margin-top: 5px;padding: 6px; border-radius: 3px; color: #fff',
        );
    }
    if (type === 'warning') {
        console.log(`%c %c ` + title + ` %c ` + tipMessage + ` %c \n %c ` + messages + ` `,
            'font-size: 16px;padding:4px;background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzM1NjM4MzgzMTcyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjczMjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik02NzYuNDEgNzYyLjZjMTcuNDYgMTcuNDcgMjguMyA0MS41NSAyOC4zIDY4LjA0IDAgMjYuNTEtMTAuODQgNTAuNTktMjguMyA2OC4wNi0xNy40NyAxNy40Ni00MS41NSAyOC4zLTY4LjA2IDI4LjMtMC42NyAwLTEuMzQgMC0yLjAxLTAuMDEtODQuODktMS4wOC0xNTMuNC03MC4yMy0xNTMuNC0xNTUuNFY1NzguODhjMCAzNi4zOSAxMi41MSA2OS44NyAzMy40NyA5Ni4zNSAyOC40NiAzNS45NyA3Mi41MSA1OS4wNiAxMjEuOTQgNTkuMDYgMjYuNTEgMCA1MC41OSAxMC44NCA2OC4wNiAyOC4zMXoiIGZpbGw9IiMzOTczZjYiIHAtaWQ9IjczMjkiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTQuMjZmNDNhODFBanBCRnkiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjxwYXRoIGQ9Ik00NTIuOTQgNzcxLjU5YzAgODUuMTYgNjguNSAxNTQuMzIgMTUzLjQgMTU1LjQtNTUuMTEtMC4zMS0xMDcuMTgtMTMuNDMtMTUzLjQtMzYuNTItMTE0LjI2LTU3LjEtMTkyLjcxLTE3NS4xOC0xOTIuNzEtMzExLjU5VjE5My4zNmMwLTUzIDQzLjM3LTk2LjM1IDk2LjM1LTk2LjM1IDUzIDAgOTYuMzUgNDMuMzUgOTYuMzUgOTYuMzV2MzcuNEg2NjcuNGMyMi40MiAwIDQzLjEgNy43NiA1OS41MyAyMC43MyAyMi4zOSAxNy42OCAzNi44MyA0NS4wNiAzNi44MyA3NS42MyAwIDI2LjUxLTEwLjg0IDUwLjU5LTI4LjMgNjguMDYtMTcuNDcgMTcuNDYtNDEuNTUgMjguMy02OC4wNiAyOC4zSDQ1Mi45NHYzNDguMTF6IiBmaWxsPSIjMTY1ZGZmIiBwLWlkPSI3MzMwIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk1LjI2ZjQzYTgxQWpwQkZ5IiBjbGFzcz0iIj48L3BhdGg+PC9zdmc+) 100% / contain no-repeat',
            'font-size: 12px;font-style:italic;background: #35495e; padding: 6px; border-radius: 3px 0 0 3px; color: #fff',
            'font-size: 12px;font-style:italic;background: #41b883; padding: 6px 6px; border-radius: 0 3px 3px 0; color: #fff',
            '',
            'font-size: 10px;font-style:italic;background: #E6A23C; margin-left: 11px;margin-top: 5px;padding: 6px; border-radius: 3px; color: #fff',
        );
    }
    if (type === 'error') {
        console.log(`%c %c ` + title + ` %c ` + tipMessage + ` %c \n %c ` + messages + ` `,
            'font-size: 16px;padding:4px;background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzM1NjM4MzgzMTcyIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjczMjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik02NzYuNDEgNzYyLjZjMTcuNDYgMTcuNDcgMjguMyA0MS41NSAyOC4zIDY4LjA0IDAgMjYuNTEtMTAuODQgNTAuNTktMjguMyA2OC4wNi0xNy40NyAxNy40Ni00MS41NSAyOC4zLTY4LjA2IDI4LjMtMC42NyAwLTEuMzQgMC0yLjAxLTAuMDEtODQuODktMS4wOC0xNTMuNC03MC4yMy0xNTMuNC0xNTUuNFY1NzguODhjMCAzNi4zOSAxMi41MSA2OS44NyAzMy40NyA5Ni4zNSAyOC40NiAzNS45NyA3Mi41MSA1OS4wNiAxMjEuOTQgNTkuMDYgMjYuNTEgMCA1MC41OSAxMC44NCA2OC4wNiAyOC4zMXoiIGZpbGw9IiMzOTczZjYiIHAtaWQ9IjczMjkiIGRhdGEtc3BtLWFuY2hvci1pZD0iYTMxM3guc2VhcmNoX2luZGV4LjAuaTQuMjZmNDNhODFBanBCRnkiIGNsYXNzPSJzZWxlY3RlZCI+PC9wYXRoPjxwYXRoIGQ9Ik00NTIuOTQgNzcxLjU5YzAgODUuMTYgNjguNSAxNTQuMzIgMTUzLjQgMTU1LjQtNTUuMTEtMC4zMS0xMDcuMTgtMTMuNDMtMTUzLjQtMzYuNTItMTE0LjI2LTU3LjEtMTkyLjcxLTE3NS4xOC0xOTIuNzEtMzExLjU5VjE5My4zNmMwLTUzIDQzLjM3LTk2LjM1IDk2LjM1LTk2LjM1IDUzIDAgOTYuMzUgNDMuMzUgOTYuMzUgOTYuMzV2MzcuNEg2NjcuNGMyMi40MiAwIDQzLjEgNy43NiA1OS41MyAyMC43MyAyMi4zOSAxNy42OCAzNi44MyA0NS4wNiAzNi44MyA3NS42MyAwIDI2LjUxLTEwLjg0IDUwLjU5LTI4LjMgNjguMDYtMTcuNDcgMTcuNDYtNDEuNTUgMjguMy02OC4wNiAyOC4zSDQ1Mi45NHYzNDguMTF6IiBmaWxsPSIjMTY1ZGZmIiBwLWlkPSI3MzMwIiBkYXRhLXNwbS1hbmNob3ItaWQ9ImEzMTN4LnNlYXJjaF9pbmRleC4wLmk1LjI2ZjQzYTgxQWpwQkZ5IiBjbGFzcz0iIj48L3BhdGg+PC9zdmc+) 100% / contain no-repeat',
            'font-size: 12px;font-style:italic;background: #35495e; padding: 6px; border-radius: 3px 0 0 3px; color: #fff',
            'font-size: 12px;font-style:italic;background: #41b883; padding: 6px 6px; border-radius: 0 3px 3px 0; color: #fff',
            '',
            'font-size: 10px;font-style:italic;background: #F56C6C; margin-left: 11px;margin-top: 5px;padding: 6px; border-radius: 3px; color: #fff',
        );
    }
}